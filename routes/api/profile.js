const express = require('express');
const request = require('request');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    get curent profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route   Post api/profile
// @desc    create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('tipe', 'Tipe harus diisi apakah band atau venue')
        .not()
        .isEmpty(),
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      tipe,
      name,
      premium,
      displayPicture,
      website,
      location,
      bio,
      genre,
      youtube,
      twitter,
      facebook,
      instagram
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (tipe) profileFields.tipe = tipe;
    if (name) profileFields.name = name;
    if (premium) profileFields.premium = premium;
    if (displayPicture) profileFields.displayPicture = displayPicture;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (genre) {
      profileFields.genre = genre.split(',').map(skill => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   Get api/profile
// @desc    get all profile
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/profile/user/:user_id
// @desc    get profile by user id
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'data tidak ditemukan' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'data tidak ditemukan' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Get api/profile/user/tipe
// @desc    get profile by user id
// @access  Public

router.get('/:tipe', async (req, res) => {
  try {
    const profile = await Profile.find({
      tipe: req.params.tipe
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'data tidak ditemukan' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'data tidak ditemukan' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    DELETE profile,user & post
// @access  private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo remove users post
    await Post.deleteMany({ user: req.user.id });
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/image
// @desc    add profile image
// @access  private

router.put(
  '/media',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('mediatype', 'mediatype is required')
        .not()
        .isEmpty(),
      check('url', 'url is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, mediatype, url } = req.body;

    const newMedia = {
      title,
      mediatype,
      url
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.media.unshift(newMedia);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   DELETE api/profile/media/:med_id
// @desc    DELETE profile,user & post
// @access  private

router.delete('/media/:med_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.media
      .map(item => item.id)
      .indexOf(req.params.med_id);

    profile.media.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/jadwal',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('tanggal', 'tanggal is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, location, tanggal, description } = req.body;

    const newExp = {
      title,
      location,
      tanggal,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.jadwal.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
// router.delete('/experience/:exp_id', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });

//     // Get remove index
//     const removeIndex = profile.experience
//       .map(item => item.id)
//       .indexOf(req.params.exp_id);

//     profile.experience.splice(removeIndex, 1);

//     await profile.save();

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.delete('/jadwal/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const expIds = foundProfile.jadwal.map(exp => exp._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /experience/5
    const removeIndex = expIds.indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      // theses console logs helped me figure it out
      console.log('expIds', expIds);
      console.log('typeof expIds', typeof expIds);
      console.log('req.params', req.params);
      console.log('removed', expIds.indexOf(req.params.exp_id));
      foundProfile.jadwal.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
