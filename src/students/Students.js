import React, { Component } from 'react';
import { Space, Table, Select, message, Button} from 'antd';
import { generateStudents } from './StudentsDB';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const columns = (handleDelete) => [
  {
    title: '№',
    key: 'index',
    render: (_, __, index) => index + 1, 
    width: '5%', 
    align: 'center',
  },
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text}</span>,
    width: '25%',
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
    width: '20%',
    align: 'center', 
  },
  {
    title: 'Оценка',
    dataIndex: 'grade',
    key: 'grade',
    width: '10%',
    align: 'center', 
  },
  {
    title: 'Фото',
    key: 'img',
    render: (_, { img }) => (
      <img src={img} alt="student" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
    ),
    width: '15%',
    align: 'center', 
  },
  {
    title: 'Действие',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button 
          type="primary" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleDelete(record.id)}
        >
          Удалить
        </Button>
      </Space>
    ),
    width: '15%',
    align: 'center', 
  },
];

export class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filteredStudents: [],
      selectedGroup: null,
      selectedGrade: null,
    };  
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const students = generateStudents();
    this.setState({
      students,
      filteredStudents: students,
    });
  }

  handleGroupChange = (value) => {
    this.setState({ selectedGroup: value }, this.filterStudents);
  };

  handleGradeChange = (value) => {
    this.setState({ selectedGrade: value }, this.filterStudents);
  };

  filterStudents = () => {
    const { students, selectedGroup, selectedGrade } = this.state;

    const filtered = students.filter(student => {
      const groupMatch = selectedGroup ? student.group === selectedGroup : true;
      const gradeMatch = selectedGrade ? student.grade === selectedGrade : true;
      return groupMatch && gradeMatch;
    });

    this.setState({ filteredStudents: filtered });
  };

  handleDelete(id) {
    const { students } = this.state;
    const updatedStudents = students.filter(student => student.id !== id);
    
    this.setState({
      students: updatedStudents,
      filteredStudents: updatedStudents, 
    });

    message.success('Студент удален'); 
  }

  render() {
    const { filteredStudents, selectedGroup, selectedGrade } = this.state;

    const groups = [...new Set(this.state.students.map(student => student.group))];
    const grades = [...new Set(this.state.students.map(student => student.grade))];

    return (
      <div className='container1'>
      <div className='filter' style={{ marginBottom: 16 }}>
        <Select 
          className='custom-select filter1'
          placeholder="Выбрать группу" 
          value={selectedGroup} 
          onChange={this.handleGroupChange} 
        >
          <Option value={null} className="custom-option" >Все группы</Option>
          {groups.map(group => (
            <Option className="custom-option" key={group} value={group}>{group}</Option>
          ))}
        </Select>
        <Select 
          className='custom-select filter1'
          placeholder="Выбрать оценку" 
          value={selectedGrade} 
          onChange={this.handleGradeChange} 
        >
          <Option value={null} className="custom-option" >Все</Option>
          {grades.map(grade => (
            <Option className="custom-option" key={grade} value={grade}>{grade}</Option>
          ))}
        </Select>
      </div>
      
      <Table 
        className="table" 
        columns={columns(this.handleDelete)} 
        dataSource={filteredStudents} 
      />
    </div>
    );
  }
}

export default Students;

