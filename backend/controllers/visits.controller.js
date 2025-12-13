import Visit from "../models/visits.model.js";
import Customer from "../models/users.model.js";

export const updateVisit = async (req, res, next) => {
  try {
    const { session, user } = req.body;
    // console.log(req.body);
    if (user) {
      const userExists = await Customer.findById(user);
      if (!userExists) throw new Error("User does not exist");

      const visitExists = await Visit.findOne({ user });

      if (visitExists) {
        const sessionExists = await Visit.findOne({ session });
        // console.log(visitExists._id);
        // console.log(sessionExists._id);
        const bothSame = String(sessionExists._id) == String(visitExists._id);
        // console.log(bothSame);

        const newSessions = [...visitExists.session, session];
        const visit = await Visit.findOneAndUpdate(
          { user },
          {
            $set: {
              session: bothSame ? [...visitExists.session] : newSessions,
              views: visitExists.views + (bothSame ? 1 : sessionExists.views),
            },
          },
        );

        sessionExists && !bothSame && (await Visit.deleteOne({ session }));
      } else {
        const sessionExists = await Visit.findOne({ session });
        if (sessionExists) {
          const visit = await Visit.findOneAndUpdate(
            { session },
            { $set: { user, name: userExists.name, views: sessionExists.views + 1 } },
          );
        } else {
          const visit = await Visit.create({
            user,
            name: userExists.name,
            session: [session],
            views: 1,
          });
        }
      }
    } else {
      const sessionExists = await Visit.findOne({ session });
      if (sessionExists) {
        const visit = await Visit.findOneAndUpdate(
          { session },
          { $set: { views: sessionExists.views + 1 } },
        );
      } else {
        const visit = await Visit.create({ session: [session], views: 1 });
      }
    }
    res.json({
      success: true,
      message: "Visit Logged",
    });
  } catch (error) {
    next(error);
  }
};

export const getVisits = async (req, res, next) => {
  try {
    const visits = await Visit.find({});
    res.json({
      success: true,
      visits,
    });
  } catch (error) {
    next(error);
  }
};
