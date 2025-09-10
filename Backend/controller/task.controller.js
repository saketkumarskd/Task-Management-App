import Task from "../model/task.model.js";

const createTask = async (req, res) => {
  const task = new Task({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const newTask = await task.save();
    res.status(201).json({ message: "Task Created Successfully", newTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in task creation" });
  }
};

export default createTask;

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in task fetching" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in task updating" });
  }
};

export const deleteTask = async (req, res) =>{
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: "Task updated successfully", task });
    } catch (error) {
      res.status(400).json({message:"Error occuring in task deletion"});  
    }
}