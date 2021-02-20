import { Todo, Priority } from '../database/models';

class TodoModel {
  /**
 * get all todos
 * @getAll
 * // return
 * [
 *  {
      "id": 2,
      "title": "Dummy Title",
      "description": "Dummy Description",
      "priority": "Dummy",
      "createdAt": "2021-02-20T17:54:06.972Z",
      "updatedAt": "2021-02-20T17:54:06.972Z"
    }
 * ]
 */
  async getAll(req, res) {
    const todos = await Todo.findAll({
      include: [
        {
          model: Priority,
          attributes: ['status'],
        },
      ],
    });
    res.status(200).json({
      message: 'Retrieved Successfully',
      todos,
    });
  }
  async create(req, res) {
    const todo = req.body;
    const newTodo = await Todo.create(todo);
    res.status(200).json({
      message: 'Created Successfully',
      todo: newTodo,
    });
  }
  async getOne(req, res) {
    const todo = await Todo.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Priority,
          attributes: ['status'],
        },
      ],
    });
    if (!todo)
      return res.status(404).json({
        error: 'Not Found',
      });
    res.status(200).json({
      message: 'Retrived Successfully',
      todo,
    });
  }
  async update(req, res) {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo)
      return res.status(404).json({
        error: 'Not Found',
      });
    const newTodo = req.body;
    const updatedTodo = await Todo.update(newTodo, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json({
      message: 'Updated Successfully',
      todo: updatedTodo[1],
    });
  }
  async delete(req, res) {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo)
      return res.status(404).json({
        error: 'Not Found',
      });
    await todo.destroy();
    res.status(200).json({
      message: 'Deleted Successfully',
    });
  }
}
export default TodoModel;
