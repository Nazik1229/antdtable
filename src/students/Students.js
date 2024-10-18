import React, { useState } from 'react';
import { Modal, Table, Button, Form, Input, InputNumber, Select, DatePicker, notification } from 'antd';
import moment from 'moment';
import { generateStudents } from './StudentsDB';
import { useTranslation } from 'react-i18next'; 

const { Option } = Select;

const Students = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState(generateStudents());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [form] = Form.useForm();
  const [editingStudent, setEditingStudent] = useState(null);

  const getUniqueValues = (key) => {
    const uniqueValues = [...new Set(students.map(student => student[key]))];
    return uniqueValues.sort((a, b) => typeof a === 'string' ? a.localeCompare(b) : a - b);
  };

  const getGroupFilters = () => getUniqueValues('group').map(group => ({ text: group, value: group }));
  const getGradeFilters = () => getUniqueValues('grade').map(grade => ({ text: grade, value: grade }));

  const openNotification = (type, message) => {
    notification[type]({
      message: type === 'success' ? t('students.notificationSuccess') : t('students.notificationError'),
      description: message,
      duration: 3,
    });
  };

  const showModal = (student) => {
    setEditingStudent(student);
    setIsModalVisible(true);
    if (student) {
      form.setFieldsValue({
        ...student,
        age: moment(student.age),
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  const onFinish = (values) => {
    try {
      if (values.name.length < 5) {
        openNotification('error', t('students.nameLengthError'));
        return;
      }
  
      if (editingStudent) {
        const hasChanges = Object.keys(values).some(key => {
          return values[key] !== editingStudent[key] || (key === 'age' && values[key].format('YYYY-MM-DD') !== editingStudent.age);
        });
  
        if (!hasChanges) {
          openNotification('error', t('students.noChanges'));
          return;
        }
  
        setStudents(students.map(student => student.id === editingStudent.id 
          ? { ...student, ...values, age: values.age.format('YYYY-MM-DD') } 
          : student
        ));
        openNotification('success', t('students.studentUpdated'));
      } else {
        const newStudent = { id: students.length + 1, ...values, img: values.img || './nomad.png', age: values.age.format('YYYY-MM-DD') };
        setStudents([...students, newStudent]);
        openNotification('success', t('students.studentAdded'));
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setEditingStudent(null);
    } catch (error) {
      openNotification('error', t('students.notificationErrorAdd'));
    }
  };

  const columns = [
    {
      title: '№',
      key: 'index',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: '5%',
      align: 'center',
    },
    {
      title: t('students.fullName'),
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: t('students.group'),
      dataIndex: 'group',
      key: 'group',
      width: '20%',
      align: 'center',
      filters: getGroupFilters(),
      onFilter: (value, record) => record.group.includes(value),
    },
    {
      title: t('students.grade'),
      dataIndex: 'grade',
      key: 'grade',
      width: '10%',
      align: 'center',
      filters: getGradeFilters(),
      onFilter: (value, record) => record.grade.includes(value),
    },
    {
      title: t('students.dateOfBirth'),
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      align: 'center',
    },
    {
      title: t('students.photo'),
      key: 'img',
      render: (_, { img }) => (
        <img src={img} alt="student" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
      ),
      width: '15%',
      align: 'center',
    },
    {
      title: t('students.actions'),
      render: (_, student) => (
        <Button className='editStudent' type="default" onClick={() => showModal(student)}>
          {t('students.edit')}
        </Button>
      ),
      width: '15%',
      align: 'center',
    },
  ];

  return (
    <div className='container1'>
      <Button className='selectStudent' type='primary' onClick={() => showModal(null)}>
        {t('students.addStudent')}
      </Button>
      <Modal
        title={editingStudent ? t('students.modalTitleEdit') : t('students.modalTitleAdd')} 
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item 
            name="name" 
            label={t('students.fullName')} 
            rules={[{ required: true, message: t('students.nameRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="group" 
            label={t('students.group')} 
            rules={[{ required: true, message: t('students.groupRequired') }]} 
          >
            <Select placeholder="Выберите группу">
              {getGroupFilters().map(group => (
                <Option key={group.value} value={group.value}>
                  {group.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item 
            name="grade" 
            label={t('students.grade')}
            rules={[{ required: true, message: t('students.gradeRequired') }]} 
          >
            <InputNumber min={1} max={5} />
          </Form.Item>
          <Form.Item 
            name="age" 
            label={t('students.dateOfBirth')} 
            rules={[{ required: true, message: t('students.ageRequired') }]} 
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name="img" label={t('students.photo')}>
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStudent ? t('students.edit') : t('students.addStudent')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className='filter' style={{ marginBottom: 16 }}>
        <Table
          className="table"
          columns={columns}
          dataSource={students}
          rowKey={(record) => record.id}
          pagination={{
            pageSize: pageSize,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default Students;

