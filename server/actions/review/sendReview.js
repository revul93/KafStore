const strings = require('../../static/strings');
const getUser = require('../user/getUser');

module.exports = async (sender_id, reciever_id, rating, text) => {
  // TODO: check if buyer user had purchased from seller user

  const sender = await getUser(sender_id);
  const reciver = await getUser(reciever_id);

  if (!sender || !reciver) {
    console.log('1');
    return strings.FAIL;
  }

  if (sender.id == reciver.id) {
    console.log('2');
    return strings.FAIL;
  }

  reciver.review.unshift({
    writer: sender.id,
    rating: rating,
    text: text,
  });

  await reciver.save();
  return strings.SUCCESS;
};
