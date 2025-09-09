import Appraisal from '../Models/appraisalModel.js';

export const createAppraisal = async (req, res, io) => {
  try {
    const { email, mobile } = req.body;

    const newAppraisal = new Appraisal({ email, mobile });
    await newAppraisal.save();

    io.emit('new_appraisal', {
      message: 'A new appraisal is created',
      message: '',
      data: {
        email,
        mobile,
        createdAt: newAppraisal.createdAt,
      },
    });

    res.status(201).json({
      message: 'Appraisal created successfully',
      data: newAppraisal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getAppraisal= async (req, res, next) => {
  try {
    const appraisals = await Appraisal.find();
    res.status(200).json(appraisals);
  } catch (error) {
    next(error);
  }
};
