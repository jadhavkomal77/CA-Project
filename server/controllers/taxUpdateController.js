// controllers/taxUpdateController.js
import TaxUpdate from '../models/TaxUpdate.js';
import { Readable } from 'stream';
import cloudinary from '../utils/cloudinary.js';

export const createTaxUpdate = async (req, res) => {
  try {
    const {
      title,
      shortSummary,
      fullExplanation,
      category,
      whoIsAffected,
      effectiveDate,
      notificationNumber,
      sourceLink,
      isImportant
    } = req.body;

    let pdfUrl = '';

    // Upload PDF to Cloudinary if provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'tax-updates',
            format: 'pdf'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

      pdfUrl = uploadResult.secure_url;
    }

    const taxUpdate = await TaxUpdate.create({
      title,
      shortSummary,
      fullExplanation,
      category,
      whoIsAffected,
      effectiveDate,
      notificationNumber: notificationNumber || '',
      sourceLink: sourceLink || '',
      pdfUrl,
      isImportant: isImportant === 'true' || isImportant === true,
      isNew: true,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: taxUpdate,
      message: 'Tax update created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating tax update'
    });
  }
};

// @desc    Get all tax updates (Public)
// @route   GET /api/tax-updates
// @access  Public
export const getAllTaxUpdates = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      importantOnly = false
    } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortSummary: { $regex: search, $options: 'i' } }
      ];
    }

    if (importantOnly === 'true') {
      query.isImportant = true;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const taxUpdates = await TaxUpdate.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email')
      .select('-fullExplanation');

    // Update isNew status
    await Promise.all(
      taxUpdates.map(update => update.updateNewStatus())
    );

    const total = await TaxUpdate.countDocuments(query);

    res.status(200).json({
      success: true,
      data: taxUpdates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching tax updates'
    });
  }
};

// @desc    Get single tax update
// @route   GET /api/tax-updates/:id
// @access  Public
export const getTaxUpdate = async (req, res) => {
  try {
    const taxUpdate = await TaxUpdate.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!taxUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Tax update not found'
      });
    }

    taxUpdate.viewsCount += 1;
    await taxUpdate.save();

    res.status(200).json({
      success: true,
      data: taxUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching tax update'
    });
  }
};

// @desc    Update tax update
// @route   PUT /api/tax-updates/admin/:id
// @access  Private/Admin
export const updateTaxUpdate = async (req, res) => {
  try {
    let taxUpdate = await TaxUpdate.findById(req.params.id);

    if (!taxUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Tax update not found'
      });
    }

    const updateData = { ...req.body };

    if (req.file) {
      // Delete old PDF from Cloudinary if exists
      if (taxUpdate.pdfUrl) {
        try {
          const publicId = taxUpdate.pdfUrl.split('/').slice(-2).join('/').split('.')[0];
          await cloudinary.uploader.destroy(`tax-updates/${publicId}`, {
            resource_type: 'raw'
          });
        } catch (deleteError) {
          console.error('Error deleting old PDF:', deleteError);
        }
      }

      // Upload new PDF
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'tax-updates',
            format: 'pdf'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

      updateData.pdfUrl = uploadResult.secure_url;
    }

    taxUpdate = await TaxUpdate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: taxUpdate,
      message: 'Tax update updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating tax update'
    });
  }
};

// @desc    Delete tax update
// @route   DELETE /api/tax-updates/admin/:id
// @access  Private/Admin
export const deleteTaxUpdate = async (req, res) => {
  try {
    const taxUpdate = await TaxUpdate.findById(req.params.id);

    if (!taxUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Tax update not found'
      });
    }

    // Delete PDF from Cloudinary if exists
    if (taxUpdate.pdfUrl) {
      try {
        const publicId = taxUpdate.pdfUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(`tax-updates/${publicId}`, {
          resource_type: 'raw'
        });
      } catch (deleteError) {
        console.error('Error deleting PDF from Cloudinary:', deleteError);
      }
    }

    await taxUpdate.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tax update deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting tax update'
    });
  }
};

// @desc    Get categories count
// @route   GET /api/tax-updates/stats/categories
// @access  Public
export const getCategoryStats = async (req, res) => {
  try {
    const stats = await TaxUpdate.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching category stats'
    });
  }
};