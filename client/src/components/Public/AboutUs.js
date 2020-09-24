// modules
import React from 'react';

// static
import '../../stylesheet/StaticPage.css';

const About = () => {
  return (
    <div className='static-page'>
      <h2 className='page-title'>{'تعرف علينا'}</h2>

      <h3 className='paragraph-head'>{'من نحن:'}</h3>
      <p className='paragraph'>
        {`مؤسسي متجر إلكتروني يُعنى ببيع وشراء الكتب المستعملة، ونتطلع إلى مستقبل مليء بالعديد من الفرص الجديدة والابتكارات الجديدة وبالطبع الكتب الجديدة!`}
      </p>

      <h3 className='paragraph-head'>{'هدفنا:'}</h3>
      <p className='paragraph'>
        {`تقديم منصة إلكترونية تمكّنك من اقتناء الكتب المستعملة وبيعها في جميع أنحاء العالم، وأن نكون مكانًا يعزز ثقافة القراءة ويربط الناس بالكتب التي يحبونها.`}
      </p>

      <h3 className='paragraph-head'>{'رؤيتنا:'}</h3>
      <p className='paragraph'>
        {'استدامة التبادل المعرفي والموارد الطبيعية وتوفير الكسب المادي.'}
      </p>
    </div>
  );
};

export default About;
