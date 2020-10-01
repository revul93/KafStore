// modules
import React from 'react';

// static
import '../../stylesheet/StaticPage.css';

const Disclaimer = () => {
  return (
    <div className='static-page'>
      <h2 className='page-title'>{'إخلاء مسؤولية'}</h2>

      <h3 className='paragraph-head'>{'يرجى الاطلاع قبل استخدام الموقع:'}</h3>
      <p className='paragraph'>
        {`تم تصميم وبرمجة هذا الموقع لأغراض تعليمية فقط.`}
        <br />
        {`وهو متطلب إجتياز مادة مشروع 1 في برنامج هندسة نظم المعلومات في الجامعة الإفتراضية السورية.`}
      </p>
      <p className='paragraph'>
        {`الرجاء عدم مشاركة معلومات أو صور شخصية في هذا الموقع. نظرا لعدم تفعيل جميع تقنيات الأمان.`}
      </p>
      <p className='paragraph'>
        {`نرحب باستخدام الموقع للتعلم والتجربة واكتشاف الأخطاء. علما أن الكود المصدري موجود بالكامل على `}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/revul93/kafstore'
        >
          Github
        </a>
      </p>
      <p className='paragraph'>
        {`يرجى التواصل معنا في حال وجود أي استفسارات أخرى على البريد الإلكتروني التالي: `}
        <a href='mailto:revul93@gmail.com'>revul93@gmail.com</a>
      </p>
    </div>
  );
};

export default Disclaimer;
