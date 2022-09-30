"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'desc'], [_Photo2.default, 'id', 'desc']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename']
        }
      });
      return res.status(200).json(students);
    } catch (e) {
      return res.status(500).json({ errors: ['ocorred on error'] });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['missing id'],
        });
      }

      const student = await _Student2.default.findByPk(id,
        {
          attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
          order: [['id', 'desc'], [_Photo2.default, 'id', 'desc']],
          include: {
            model: _Photo2.default,
            attributes: ['url', 'filename']
          }
        });

      if (!student) {
        return res.status(404).json({
          errors: ['Student not found'],
        });
      }

      return res.status(200).json(student);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async store(req, res) {
    try {
      const newStudent = await _Student2.default.create(req.body);
      return res.status(201).json(newStudent);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['missing id'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(404).json({
          errors: ['Student not found'],
        });
      }

      const updatedStudent = await student.update(req.body);
      return res.status(200).json(updatedStudent);
    } catch (e) {
      return res.status(500).json({ errors: ['ocorred on error'] });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['missing id'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(404).json({
          errors: ['Student not found'],
        });
      }

      await student.destroy();
      return res.status(200).json({ msg: 'User deleted successfully' });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new StudentController();
