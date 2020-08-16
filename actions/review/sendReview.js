const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    /*********** TODO *********
     * check if buyer user had purchased from seller user
     **************************/

    try {
      // get the reviewer user (by), and the revuewed user (to)
      const by = await User.findById(req.user.id);
      const to = await User.findById(req.body.user_id);

      // check if both users exist
      if (!by || !to) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // add the review to the reviewed user
      to.review.unshift({
        writer: by.id,
        rating: req.body.rating,
        text: req.body.text,
      });
      await to.save();

      return res.send(strings.REVIEW_ADDED_SUCCESSFULLY.AR);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
