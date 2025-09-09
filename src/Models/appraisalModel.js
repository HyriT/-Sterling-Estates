import mongoose from 'mongoose';

const appraisalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
    },
       status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Appraisal = mongoose.model('Appraisal', appraisalSchema);

export default Appraisal;