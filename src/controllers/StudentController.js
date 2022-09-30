import Student from '../models/Student';
import Photo from '../models/Photo'

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'desc'], [Photo, 'id', 'desc']],
        include: {
          model: Photo,
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

      const student = await Student.findByPk(id,
        {
          attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
          order: [['id', 'desc'], [Photo, 'id', 'desc']],
          include: {
            model: Photo,
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
      const newStudent = await Student.create(req.body);
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

      const student = await Student.findByPk(id);

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

      const student = await Student.findByPk(id);

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
export default new StudentController();
