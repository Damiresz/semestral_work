// Namespace
window.MyApp = window.MyApp || {};

// Base constructor
MyApp.Person = function(name) {
  this.name = name;
};
MyApp.Person.prototype.greet = function() {
  return `Hello, my name is ${this.name}`;
};

// Inheritor
MyApp.Student = function(name, university) {
  MyApp.Person.call(this, name);
  this.university = university;
};
MyApp.Student.prototype = Object.create(MyApp.Person.prototype);
MyApp.Student.prototype.constructor = MyApp.Student;
MyApp.Student.prototype.info = function() {
  return `${this.greet()} and I study at ${this.university}`;
};

// Usage example
window.oopDemoResult = function() {
  const john = new MyApp.Person('John');
  const alice = new MyApp.Student('Alice', 'CVUT');
  return [
    john.greet(),
    alice.greet(),
    alice.info()
  ];
}; 