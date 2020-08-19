const strings = {
  // General messages
  SERVER_ERROR: 'Server Error!',
  NOT_AUTHORIZED: 'Not authorized',
  FAIL: 'Operation failed',
  SUCCESS: 'Operation successed',
  MISSING_INFO: 'Some required info are missing',
  NO_DATA: 'البيانات المطلوبة غير موجودة',

  // login messages
  LOGIN_FAILED:
    'فشل تسجيل الدخول، الرجاء التأكد من البريد الالكتروني وكلمة السر',

  // user operation related messages
  NO_REGISTERED_USERS: 'لا يوجد مستخدمين مسجلين',
  NO_REVIEWS: 'لم يتم العثور على تقييمات لهذا المستخدم',
  NO_COMPLAINTS: 'لا يوجد شكاوي',

  NAME_IS_EMPTY: {
    AR: 'لا يمكن أن يكون حقل الاسم فارغا',
    EN: 'Must provide a name',
  },
  EMAIL_NOT_VALID: {
    AR: 'يرجى إدخال بريد إلكتروني صالح',
    EN: 'Please provide a valid email',
  },
  EMAIL_IS_USED: {
    AR: 'البريد الإلكتروني مسجل مسبقا',
    EN: 'Another user already use this email',
  },
  PASSWORD_IS_EMPTY: {
    AR: 'الرجاء إدخال كلمة اسر',
    EN: '',
  },
  PASSWORD_COMPLEXITY: {
    AR: 'يجب أن تكون كلمة السر مكونة من ست خانات على الأقل',
    EN: 'Password must be at least 6 characters long',
  },
  PASSWORD_MISMATCH: {
    AR: 'كلمتا السر غير متطابقتان',
    EN: 'Password mismatch',
  },
  PHONE_NOT_VALID: {
    AR: 'الرجاء إدخال رقم هاتف صالح',
    EN: '',
  },
  GENDER_REQUIRED: {
    AR: 'يرجى اختيار الجنس',
    EN: '',
  },
  COUNTRY_IS_EMPTY: {
    AR: 'يرحى إدخال اسم الدولة',
    EN: '',
  },
  CITY_IS_EMPTY: {
    AR: 'يرجى إدخال اسم المدينة',
    EN: '',
  },
  DISTRICT_IS_EMPTY: {
    AR: 'يرجى إدخال اسم الحي',
    EN: '',
  },
  STREET_IS_EMPTY: {
    AR: 'يرجى إدخال اسم الشارع',
    EN: '',
  },
  POSTAL_INVALID: {
    AR: 'يرجى إدخال رمز بريدي صالح',
    EN: '',
  },

  BOOK_TITLE: {
    AR: 'يجب إدخال اسم الكتاب',
    EN: '',
  },
  BOOK_AUTHOR: {
    AR: 'يجب إدخال اسم المؤلف',
    EN: '',
  },
  BOOK_ISBN: {
    AR: 'يجب أن يكون رقم ISBN مكون من 10 أرقام أو 13 رقما',
    EN: '',
  },
  BOOK_SECTION: {
    AR: 'يجب إدخال القسم',
    EN: '',
  },
  BOOK_SUBSECTION: {
    AR: 'يجب إدخال القسم الفرعي',
    EN: '',
  },
  BOOK_COVERIMAGE: {
    AR: 'يجب تحميل صورة غلاف',
    EN: '',
  },
  BOOK_PRICE: {
    AR: 'يجب إدخال سعر صحيح',
    EN: '',
  },
  BOOK_CONDITION: {
    AR: 'يجب إدخال حالة الكتاب',
    EN: '',
  },
  BOOK_IMAGES: {
    AR: 'يجب ألا تقل الصور المضافة عن ثلاثة ولا تزيد عن عشرة',
    EN: '',
  },

  COMPLAINT_ADDED_SUCCESSFULLY: {
    AR: 'تم إرسال الشكوى بنجاح، سيتم التواصل معكم قريبا',
    EN: 'Your complaint sent successfully. We will contact you soon',
  },
  COMPLAINT_SUBJECT_REQUIRED: {
    AR: 'عنوان الشكوى مطلوب',
    EN: 'Complaint subject is required',
  },
  COMPLAINT_DESCRIPTION_REQUIRED: {
    AR: 'وصف الشكوى مطلوب',
    EN: 'Complaint description is required',
  },
};

module.exports = strings;
