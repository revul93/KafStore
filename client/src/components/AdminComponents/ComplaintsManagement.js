// modules
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';

//helpers
import getAllUsers from '../../utils/getAllUsers';

// static
import '../../stylesheet/Complaint.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const ComplaintsManagement = (props) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [complaints, setComplaints] = useState(null);
  const { isLoggedIn, token, isAdmin } = props;
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    getAllUsers(token).then((users) => {
      if (!users) {
        setPageLoading(false);
        return;
      } else {
        const usersComplaints = [];
        users.forEach(
          (user) =>
            user.complaint &&
            user.complaint.forEach((complaint) => {
              usersComplaints.push({
                ...complaint,
                userName: user.name,
                userId: user._id,
              });
            })
        );
        setComplaints(usersComplaints);
        setPageLoading(false);
      }
    });
  }, [token]);

  const editComplaint = async (user_id, complaint_id, action) => {
    if (action === '--- اختر الإجراء المتخذ ---') {
      swal({
        title: 'معلومات ناقصة',
        text: 'يرجى اختيار الإجراء',
        icon: 'error',
        buttons: 'موافق',
      });
    }
    setPageLoading(true);
    setComplaints(null);
    axios
      .put(
        '/api/complaint',
        JSON.stringify({ user_id, complaint_id, action }),
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        getAllUsers(token).then((users) => {
          if (!users) {
            setPageLoading(false);
            return;
          } else {
            const usersComplaints = [];
            users.forEach(
              (user) =>
                user.complaint &&
                user.complaint.forEach((complaint) => {
                  usersComplaints.push({
                    ...complaint,
                    userName: user.name,
                    userId: user._id,
                  });
                })
            );
            setComplaints(usersComplaints);
            setPageLoading(false);
          }
        });
      });
  };

  const deleteComplaint = async (user_id, complaint_id) => {
    swal({
      title: ' هل أنت متأكد !',
      text: 'سوف يتم حذف الشكوى نهائيا. استمرار',
      icon: 'warning',
      buttons: ['إلغاء', 'موافق'],
      dangerMode: true,
    }).then((willDelete) => {
      setPageLoading(true);
      if (willDelete) {
        axios
          .delete('/api/complaint', {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json',
            },
            data: { user_id, complaint_id },
          })
          .then(() => {
            getAllUsers(token).then((users) => {
              if (!users) {
                setPageLoading(false);
                return;
              } else {
                const usersComplaints = [];
                users.forEach(
                  (user) =>
                    user.complaint &&
                    user.complaint.forEach((complaint) => {
                      usersComplaints.push({
                        ...complaint,
                        userName: user.name,
                        userId: user._id,
                      });
                    })
                );
                setComplaints(usersComplaints);
                setPageLoading(false);
              }
            });
          });
      }
      setPageLoading(false);
    });
  };

  if (!isAdmin) {
    return <Redirect to='/' />;
  }

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (pageLoading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  return (
    <>
      {complaints && complaints.length > 0 ? (
        <div className='complaints-container'>
          <h3 className='complaints-title'>{'الشكاوى'}</h3>
          {complaints.map((complaint, index) => (
            <div key={index} className='complaint'>
              <span className='complaint-info complaint-subject'>{`الموضوع: ${complaint.subject}`}</span>
              <span className='complaint-info'>
                {'مقدم الشكوى: '}
                <Link
                  className='complaint-info'
                  to={`/profile/${complaint.userId}`}
                >
                  {complaint.userName}
                </Link>
              </span>
              <span className='complaint-info'>{`رقم الشكوى: ${complaint._id.slice(
                complaint._id.length - 10
              )}`}</span>
              <span className='complaint-info complaint-description'>
                {complaint.description}
              </span>
              <span className='complaint-info'>
                {`تاريخ الشكوى: ${new Date(
                  complaint.date
                ).toLocaleDateString()}`}
              </span>
              <form
                name={`form_${complaint._id}`}
                className='form'
                onSubmit={handleSubmit(() =>
                  editComplaint(
                    complaint.userId,
                    complaint._id,
                    watch(`action_${complaint._id}`)
                  )
                )}
              >
                <label className='form-control-label'>{`الإجراء المتخذ`}</label>
                <select
                  name={`action_${complaint._id}`}
                  className='form-control'
                  ref={register()}
                  defaultValue={
                    complaint.action || '--- اختر الإجراء المتخذ ---'
                  }
                >
                  <option disabled>{'--- اختر الإجراء المتخذ ---'}</option>
                  <option
                    value={`تم التواصل مع المستخدم`}
                  >{`تم التواصل مع المستخدم`}</option>
                  <option value={'تم حل الإشكالية'}>{'تم حل الإشكالية'}</option>
                  <option value={'شكوى خاطئة'}>{'شكوى خاطئة'}</option>
                </select>
                <input
                  type='submit'
                  value='حفظ'
                  className='form-control form-control-submit'
                  style={{ backgroundColor: 'darkcyan' }}
                />
                <button
                  className='form-control form-control-submit'
                  onClick={(event) => {
                    event.preventDefault();
                    deleteComplaint(complaint.userId, complaint._id);
                  }}
                >
                  {'حذف'}
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-info'>{'لا يوجد شكاوى'}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(ComplaintsManagement);
