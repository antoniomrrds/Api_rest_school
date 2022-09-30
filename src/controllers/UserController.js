import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.status(201).json({ id, name, email });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ errors: ['ocorred on error'] });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        const { id, name, email } = user;
        return res.status(200).json({ id, name, email });
      }
      return res.status(404).json({ errors: ['User not found'] });
    } catch (e) {
      return res.status(500).json({ errors: ['ocorred on error'] });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (user) {
        const updatedUser = await user.update(req.body);
        const { id, name, email } = updatedUser;
        return res.status(200).json({ id, name, email });
      }
      return res.status(404).json({ errors: ['User not found'] });
    } catch (e) {
      return res.status(400).json({ errors: ['ocorred on error'] });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (user) {
        await user.destroy();
        return res.status(200).json({ msg: 'User deleted successfully' });
      }
      return res.status(404).json({ errors: ['User not found'] });
    } catch (e) {
      return res.status(500).json({ errors: ['ocorred on error'] });
    }
  }
}
export default new UserController();
