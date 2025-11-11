import Customer from "../models/users.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      const err = new Error("Unauthorized: Not an admin");
      err.statusCode = 401;
      throw err;
    }

    const data = await Customer.find({}, "googleId name email role");
    res.json({
      success: true,
      users: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.user;
  const { name, role, email } = await Customer.findById(id);

  res.json({
    success: true,
    user: {
      id,
      name,
      email,
      role,
    },
  });
};

export const updateUser = async (req, res, next) => {
  try {
    const { id: paramId } = req.params;
    const { id, role } = req.user;
    const { name, email } = req.body;

    if (id !== paramId && role !== "admin")
      throw new Error("Unauthorized: Can not modify someone else's account");

    const userExists = await Customer.findOne({ email });
    // console.log(userExists);
    if (userExists && userExists._id != paramId) {
      throw new Error("Email already exists");
    }

    if (userExists) {
      if (userExists._id != paramId) throw new Error("Email already exists");
      if (userExists.email == email && userExists.name == name) throw new Error("No changes made");
    }
    const user = await Customer.findByIdAndUpdate(
      paramId,
      { $set: { name, email } },
      { new: true },
    ).select("name email role");

    res.json({
      success: true,
      message: "User updated",
      updateType: `Modified by ${role == "user" ? "self" : role}`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
