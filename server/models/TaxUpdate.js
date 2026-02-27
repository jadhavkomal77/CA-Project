// models/TaxUpdate.js
import mongoose from 'mongoose';

const taxUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  shortSummary: {
    type: String,
    required: [true, 'Short summary is required'],
    trim: true,
    maxlength: [500, 'Summary cannot exceed 500 characters']
  },
  fullExplanation: {
    type: String,
    required: [true, 'Full explanation is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
   
  },
  whoIsAffected: {
    type: String,
    required: [true, 'Who is affected field is required'],
    trim: true
  },
  effectiveDate: {
    type: Date,
    required: [true, 'Effective date is required']
  },
  notificationNumber: {
    type: String,
    trim: true,
    default: ''
  },
  sourceLink: {
    type: String,
    trim: true,
    default: ''
  },
  pdfUrl: {
    type: String,
    default: ''
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Index for search and filtering
taxUpdateSchema.index({ title: 'text', shortSummary: 'text', fullExplanation: 'text' });
taxUpdateSchema.index({ category: 1, createdAt: -1 });
taxUpdateSchema.index({ isImportant: 1, isNew: 1 });

// Auto-update isNew after 7 days
taxUpdateSchema.methods.updateNewStatus = function() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  if (this.createdAt < sevenDaysAgo) {
    this.isNew = false;
    return this.save();
  }
  return Promise.resolve(this);
};

export default mongoose.model('TaxUpdate', taxUpdateSchema);