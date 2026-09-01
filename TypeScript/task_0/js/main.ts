interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'Guillaume',
  lastName: 'Salva',
  age: 23,
  location: 'San Francisco',
};

const student2: Student = {
  firstName: 'Cassandra',
  lastName: 'Loui',
  age: 25,
  location: 'Miami',
};

const studentsList: Student[] = [student1, student2];

function renderTable(students: Student[]): void {
  const table: HTMLTableElement = document.createElement('table');

  students.forEach((student: Student) => {
    const row: HTMLTableRowElement = document.createElement('tr');

    const firstNameCell: HTMLTableCellElement = document.createElement('td');
    firstNameCell.innerHTML = student.firstName;

    const locationCell: HTMLTableCellElement = document.createElement('td');
    locationCell.innerHTML = student.location;

    row.appendChild(firstNameCell);
    row.appendChild(locationCell);

    table.appendChild(row);
  });

  document.body.appendChild(table);
}

renderTable(studentsList);
