// modules
import React from 'react';

// static
import '../../stylesheet/StaticPage.css';

const Policy = () => {
  return (
    <div className='static-page'>
      <h2 className='page-title'>{'الخصوصية وسياسة الاستخدام'}</h2>

      <h3 className='paragraph-head'>{'سياسة الموقع:'}</h3>
      <p className='paragraph'>
        {`تنطبق هذه السياسات على استخدامك لمتجر كاف الإلكتروني. باستخدام موقع
    المتجر فأنت توافق على الالتزام بهذه الشروط والأحكام. وفي حال عدم موافقتك
    على الشروط والأحكام يتعين عليك عدم استخدام الموقع. كجزء من التزامنا متجر
    كاف مكانا ترغب في زيارته باستمرار فإننا نرحب بكافة تعليقاتك على أي من
    .السياسات أو القواعد التي ندرجها أدناه`}
      </p>

      <h3 className='paragraph-head'>{'العضوية و كلمة المرور:'}</h3>
      <p className='paragraph'>
        {`اذا قررت استخدام هذا الموقع، ستكون مسؤولا عن صيانة سرية حساباتك وكلمة السر وعن منع أي دخول متطفل الى حاسوبك. وستوافق على أن تكون مسؤولا عن كل النشاطات التي ستتم باستخدام كلمة السر الخاصة بك، وعليه فإنك توافق على أن تُعلم إدارة الموقع مباشرة عن أي استخدام غير مشروع لحسابك أو عن أي خرق لسرّيته.`}
      </p>

      <h3 className='paragraph-head'>{'سياسة الخصوصية:'}</h3>
      <p className='paragraph'>
        {`إن بيانات التسجيل وبعض المعلومات الأخرى التي تتعلق بك تندرج تحت سياسة الخصوصية التي يتبعها متجر كاف، ولن يتم مشاركة المعلومات الشخصية التي تقوم بتقديمها على هذا الموقع خارجه إلا بعد الحصول على إذن منك.`}
      </p>

      <h3 className='paragraph-head'>{'سلوك العضوية:'}</h3>
      <p className='paragraph'>
        {`إنك تمثل وتضمن وتتعهد بما يلي:`}
        <ul className='paragraph-list'>
          <li className='paragraph-list-item'>
            {
              'لن تعمل على سحب أو بعث أو إيصال أو توزيع أو نشر أي مادة من المواد المتوفرة على متجر كاف، والتي من شأنها أن تحد أو تمنع أي مستعمل آخر من استعمال الموقع والاستفادة من محتوياته.'
            }
          </li>
          <li className='paragraph-list-item'>
            {
              'أن تخرق القانون أو تحمل تهديدا أو عدوانا أو سبا أو قدحا أو تصرفا فاحشا غير أخلاقي أو تهجما أو خروجا عن الآداب والأخلاق.'
            }
          </li>
          <li className='paragraph-list-item'>
            {
              'أن تدفع إلى القيام بسلوك يعتبر تعديا إجراميا أو تشجع عليه، مما من شأنه أن يؤدي إلى المسؤولية المدنية أو أي شكل من أشكال خرق القانون.'
            }
          </li>
          <li className='paragraph-list-item'>
            {
              'أن تتعدى على حقوق أطراف أخرى ثالثة أو تسرق أو تتجاوز هذه الحقوق المتعلقة بكل حقوق الملكية الفكرية بدون حدود، والحقوق التجارية المسجلة وحقوق براءات الاختراع والحقوق الخاصة والعامة أو أي حق من حقوق الملكية.'
            }
          </li>
          <li className='paragraph-list-item'>
            {
              'أن تشتمل تلك المواد على فيروس معلوماتي أو أي شيء آخر ضار بالموقع.'
            }
          </li>
          <li className='paragraph-list-item'>
            {'أن تشتمل على أي إعلان أو دعاية كيفما كانت.'}
          </li>
          <li className='paragraph-list-item'>
            {
              'يجب الإطلاع والموافقة على شروط التسجيل بموقع متجر كاف، وتسجيلك يعني موافقتك والتزامك بشروط التسجيل والمشاركة وعند خرق أي من هذه الشروط يحق للإدارة إيقاف أو إلغاء عضويتك فورًا.'
            }
          </li>
        </ul>
      </p>

      <h3 className='paragraph-head'>{'محتوى الموقع:'}</h3>
      <p className='paragraph'>
        {
          'يقدم متجر كاف و يوفر مجموعة متنوعة من المعلومات وعدد من الأدوات في الموقع لمساعدتك. جميع التعليقات وردود فعل المستخدمين في صفحات الكتب هي جزء من محتويات الموقع. على مستخدمي الموقع أن يدركوا أن إدارة الموقع لاتساهم في المضمون الوارد في التعليقات والآراء التي تُنشر في صفحات الموقع من قبل مستخدمي الموقع.'
        }
      </p>

      <h3 className='paragraph-head'>{'الإلغاء:'}</h3>
      <p className='paragraph'>
        {
          'موقع متجر كاف لديه الحق بمنع أو إلغاء دخول المستخدم إلى الموقع أو وقف التعامل مع أي شخص في حالة ثبوت استخدامه الألفاظ النابية، الفحش، التهديد، المضايقة، التشهير، والتعليقات المسيئة بأي طريقة كانت أو التعرض بأي شكل من الأشكال تجاه أي ممستخدم للموقع.!'
        }
      </p>
    </div>
  );
};

export default Policy;
