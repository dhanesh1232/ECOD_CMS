const { SERVICE_SLUGS } = require("@/data/service_data");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSubmissionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      validate: {
        validator: function (email) {
          const tempDomains = [
            "temp-mail.org",
            "mailinator.com",
            "guerrillamail.com",
            "10minutemail.com",
            "yopmail.com",
          ];
          return !tempDomains.some((domain) => email.includes(domain));
        },
        message: "Temporary email addresses are not allowed",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (phone) {
          return phone.replace(/\D/g, "").length >= 8;
        },
        message: "Phone number must be valid",
      },
    },

    // Service Details (Stage 2)
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      enum: SERVICE_SLUGS,
    },
    budget: {
      type: String,
      required: [true, "Budget range is required"],
    },
    timeline: {
      type: String,
      required: [true, "Project timeline is required"],
    },

    // Project Brief (Stage 3)
    description: {
      type: String,
      required: [true, "Project description is required"],
      minlength: [20, "Description should be at least 20 characters"],
    },
    referenceLinks: {
      type: [String],
      default: [],
    },
    budgetDetails: {
      type: String,
      required: function () {
        return this.budget === "custom";
      },
    },
    timelineDetails: {
      type: String,
      required: function () {
        return this.timeline === "custom";
      },
    },

    // Verification (Stage 4)
    verification: {
      emailVerified: {
        type: Boolean,
        default: false,
      },
      whatsappVerified: {
        type: Boolean,
        default: false,
      },
      verificationMethod: {
        type: String,
        enum: ["email", "whatsapp"],
        required: true,
      },
    },

    // Metadata
    metadata: {
      ipAddress: {
        type: String,
        required: true,
      },
      userAgent: {
        type: String,
        required: true,
      },
      formFingerprint: {
        screenResolution: String,
        colorDepth: Number,
        timezone: String,
        plugins: [String],
        cookiesEnabled: Boolean,
        doNotTrack: String,
        hardwareConcurrency: Number,
        language: String,
        platform: String,
      },
      recaptchaToken: {
        type: String,
        required: true,
      },
      submissionCount: {
        type: Number,
        required: true,
        min: 1,
      },
    },

    // System Fields
    status: {
      type: String,
      enum: ["new", "in-review", "contacted", "archived"],
      default: "new",
    },
    notes: [String],

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
ContactSubmissionSchema.index({ email: 1 });
ContactSubmissionSchema.index({ serviceType: 1 });
ContactSubmissionSchema.index({ status: 1 });
ContactSubmissionSchema.index({ createdAt: -1 });

// Virtuals
ContactSubmissionSchema.virtual("isHighPriority").get(function () {
  return ["seo", "web-development"].includes(this.serviceType);
});

ContactSubmissionSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// Pre-save hooks
ContactSubmissionSchema.pre("save", function (next) {
  // Clean phone number before saving
  if (this.isModified("phone")) {
    this.phone = this.phone.replace(/\D/g, "");
  }

  // Ensure referenceLinks is an array
  if (this.referenceLinks && !Array.isArray(this.referenceLinks)) {
    this.referenceLinks = [this.referenceLinks];
  }

  this.updatedAt = new Date();
  next();
});

// Static methods
ContactSubmissionSchema.statics.findByService = function (serviceType) {
  return this.find({ serviceType: serviceType.toLowerCase() });
};

// Instance methods
ContactSubmissionSchema.methods.logStatusChange = function (newStatus, note) {
  this.notes.push(
    `Status changed from ${this.status} to ${newStatus} at ${new Date()}`
  );
  if (note) this.notes.push(note);
  this.status = newStatus;
};

const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model("ContactSubmission", ContactSubmissionSchema);

module.exports = ContactSubmission;
