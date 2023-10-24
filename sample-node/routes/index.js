const { Router } = require("express");
const router = Router();
const { body, validationResult } = require('express-validator');

const { contactForm } = require("../models/ContactForm")

router.post('/create',
  body('firstname').notEmpty().withMessage("First Name Required"),
  body('lastname').notEmpty().withMessage("Last Name Required"),
  body('email').notEmpty().withMessage("Email Required").isEmail().withMessage("Enter Valid Email"),
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).send(errors)
    }

    const formData = req.body;

    try {

      const saveContactForm = new contactForm(formData)
      await saveContactForm.save()

      res.status(200).json({ msg: 'Created' });

    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: error });
    }

  });


  router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const updatedContact = await contactForm.findByIdAndUpdate(id, updatedData, { new: true });
      if (updatedContact) {
        res.status(200).json({ msg: 'Updated' });
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


router.delete('/delete/:id', async (req, res) => {

  const { id } = req.params;


  await contactForm.findOneAndDelete({
    _id: id
  })

  res.status(200).json({ msg: 'Deleted' });

});

router.get('/list', async (req, res) => {

  const response =  await contactForm.find({});
  res.status(200).json({ data: response });

});

router.get('/items/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const response = await contactForm.findOne({ _id: id });

    if (response) {
      res.status(200).json({ data: response });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;