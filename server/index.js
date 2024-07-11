
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =require('cors'); //For cross origin resource sharing
const bcrypt = require('bcrypt'); //library for password hashing

const app = express(); //creates an express application
const port = 3001; //set the port for the server
const TeamName = require('./TeamSchema.js');
app.set('view engine', 'ejs');
app.use(cors());

app.use(bodyParser.json());// to parse json request bodies

//connection to mongodb
//mongodb+srv://eppanooripooja02:pooja1998@cluster0.3laa2ot.mongodb.net/
mongoose.connect('mongodb+srv://lmanesh235:Manesh@cluster0.oreqmhg.mongodb.net/',
 {
     useNewUrlParser: true
      //useUnifiedTopology: true 
    })
  .then(() => {
    console.log('Successfully connected to mongodb');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Defined user schema for mongodb collection
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String,
  password: String,
});

const User = mongoose.model('Users', userSchema); //To interact with the database

// Define a POST endpoint for user signup
app.post('/signup', async (req, res) => {
  const { firstName, lastName, userId, password } = req.body;

  try {
    // Code for Checking if the username is already taken
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: 'This userid already taken' });
    }

    // Hash the User's password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    //Code for Creating  a new user
    const newUser = new User({
      firstName,
      lastName,
      userId,
      password: hashedPassword,
    });

    await newUser.save(); 
    res.status(201).json({ message: 'Signup successful' }); 
  } 
  catch (error)
   {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Defining a POST endpoint for user login
app.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });//find the user with the provided userid in the database

    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });//responds invalid if user not found in the Database
    }

    const passwordMatch = await bcrypt.compare(password, user.password);//compare the provided password with the hashed password

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });//if the password doesn't match responds with an error message
    }

    //res.status(200).json({ message: 'Logged in  successful' });
    return res.json({data:user});
     //For valid credentials responds login successful
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.post('/createTeam', async (req, res) => {
  try {
    
    const newTeam = new TeamName(req.body);

 
    await newTeam.save();

  
    res.status(201).json({ message: 'Team created successfully' });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getusers', async (req, res) => {
  try {
   
    const managers_ = await User.find().select(['firstName']);//await User.find().exec();
    const teams_ = await TeamName.find().select(['team_name']).exec();
    owners = teams_.map((owner) => owner.team_name);
    managers = managers_.map((user) => user.firstName); 

    res.json({ managers_, teams_ });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getusersforroster', async (req, res) => {
  try {
   
    const managers_ = await User.find().select();//await User.find().exec();
    const teams_ = await TeamName.find().select(['team_name']).exec();
    owners = teams_.map((owner) => owner.team_name);
    managers = managers_.map((user) => user.firstName); 

    res.json({ managers_, teams_ });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const Project = require('./ProjectSchema.js');//mongoose.model("Project", ProjectSchema);



app.post('/createProject', async (req, res) => {
  const { proj_name, proj_desc, prod_owner_id, mgr_id, team_id } = req.body;

  try {
   
    const newProject = new Project({
      proj_name,
      proj_desc,
      prod_owner_id,
      mgr_id,
      team_id,
     
    });
    console.error(newProject);
    
    await newProject.save();

    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getProjects', async (req, res) => {
  try {
    const projects = await Project.find()
    //console.log(projects);
    let responseDetails = []
    for (const project of projects) {
       const manager = await User.findById(project.mgr_id)
       const owner = await User.findById(project.prod_owner_id)
       const team = await TeamName.findById(project.team_id)
       responseDetails.push({
         project_id: project._id,
         project_name: project.proj_name,
         description: project.proj_desc,
         manager_details: manager,
         owner_details: owner,
         teams_details: team
       })
    }
    res.send(responseDetails)
}
catch (error) {
  console.log(error);
    res.status(500).send(error)
}
});

app.get('/getTeams', async (req, res) => {
  try {

    const teams = await TeamName.find();


    const teamNames = teams.map((team) => team.team_name);

    res.json({ teamNames });
  } catch (error) {
    console.error('Error fetching team names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const UserStory = require('./UserStorySchema.js');

// Create a new user story
app.post('/createUserStory', async (req, res) => {
  try {
    const { user_story, proj_id, priority } = req.body;
    const newUserStory = new UserStory({
      user_story,
      proj_id,
      priority,
    });

    const createdUserStory = await newUserStory.save();
    res.json(createdUserStory);
  } catch (error) {
    console.error('Error creating user story:', error);
    res.status(500).json({ error: 'Failed to create user story' });
  }
});

app.get('/getUserStories/:projectId', async (req, res) => {
  try {
      const userStories = await UserStory.find({ proj_id: req.params.projectId });
      res.json(userStories);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});
app.get('/getUserStories/', async (req, res) => {
  try {
      const userStories = await UserStory.find();
      res.json(userStories);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});
app.delete('/deleteUserStory/:userStoryId', async (req, res) => {
  try {
    console.log("reached here");
    const userStoryId = req.params.userStoryId;
    
    // Find the user story by its ID and remove it
    const deletedUserStory = await UserStory.findByIdAndRemove(userStoryId);

    if (!deletedUserStory) {
      return res.status(404).json({ message: 'User story not found' });
    }

    return res.status(200).json({ message: 'User story deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


const TeamRoster = require('./TeamRoasterSchema.js');

app.post('/addTeamMembers', async (req, res) => {
  try {
    const { team_name, member_names } = req.body;

    // Retrieve the IDs for the selected team and members
    const team = await TeamName.findOne({ team_name });
    const members = await User.find({ _id: { $in: member_names } });
    console.log(team);
    console.log(member_names);
    if (!team || members.length === 0) {
      return res.status(400).json({ error: 'Invalid team or member data' });
    }

    // Create an array of team member documents
    const teamMembers = members.map(member => ({
      team_id: team._id,
      member_id: member._id,
    }));

    // Insert the team members into the "TeamRoster" collection
    await TeamRoster.insertMany(teamMembers);

    res.json({ message: 'Members added to the team successfully' });
  } catch (error) {
    console.error('Error adding team members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getTeamMembers', async (req, res) => {
  try {
    const { team } = req.query;

    // Find the team based on its name
    const teamRecord = await TeamName.findOne({ team_name: team });

    if (!teamRecord) {
      return res.status(400).json({ error: 'Invalid team name' });
    }

    // Find members of the selected team in the TeamRoster collection
    const members = await TeamRoster.find({ team_id: teamRecord._id });

    // Retrieve user details for the members from your User model
    const memberIds = members.map((member) => member.member_id);
    const users = await User.find({ _id: { $in: memberIds } });

    res.json({ members: users });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/removeTeamMembers', async (req, res) => {
  try {
    const { team, users } = req.body;

    // Find the team based on its name
    const teamRecord = await TeamName.findOne({ team_name: team });

    if (!teamRecord) {
      return res.status(400).json({ error: 'Invalid team name' });
    }

    // Remove selected users from the team
    const result = await TeamRoster.deleteMany({ team_id: teamRecord._id, member_id: { $in: users } });

    if (result.deletedCount > 0) {
      res.json({ message: 'Members removed from the team successfully' });
    } else {
      res.status(400).json({ error: 'No members were removed' });
    }
  } catch (error) {
    console.error('Error removing team members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getTeamRoster/:loggedInUser', async(req,res) => {
try{
  const {loggedInUser} = req.params;
  console.log(loggedInUser);
  const teamRoasterRecord = await TeamRoster.findOne({member_id: loggedInUser});
  console.log(teamRoasterRecord);
  if(teamRoasterRecord)
  {
    res.json({teamRoasterRecord});
  }
  else
  {
    res.status(400).json({error: "No matching record found!"});
  }
}
catch(error){
  res.status(500).json({ error: 'Internal Server Error' });
  console.error(error)
}
});
const AssignedUserStory = require("./AssignedSchema.js");
app.post('/assignStory', async (req, res) => {
  try {
    const { user_story_id, user_id } = req.body;

    // Check if the user story is already assigned
    const existingAssignment = await AssignedUserStory.findOne({ user_story_id });

    if (existingAssignment) {
      return res.status(400).json({ error: 'User story is already assigned.' });
    }

    // Create a new assignment
    const newAssignment = new AssignedUserStory({
      user_story_id,
      user_id,
    });

    // Save the assignment to the database
    await newAssignment.save();

    // Return a success response
    res.json({ message: 'User story assigned successfully.' });
  } catch (error) {
    console.error('Error assigning user story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAssignedUserStories/', async (req, res) => {
  try {
      const userStories = await AssignedUserStory.find();
      res.json(userStories);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});
app.get('/getAssignedUserStoriesValue/:loggedInUser', async (req, res) => {
  try {
    const {loggedInUser} = req.params;
      const userStories = await AssignedUserStory.find({user_id:loggedInUser});
      const userStoriesValues = [];
     for (const userStory of userStories) {
      const userStoryValue = await UserStory.findById(userStory.user_story_id);
      if (userStoryValue) {
        userStoriesValues.push(userStoryValue);
      }
    }

    console.log(userStoriesValues);
    res.json(userStoriesValues);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});
const TaskListModel = require("./TaskListSchema.js");
app.post('/createTask', async (req, res) => {
  try {
    const { task, user_story_id, created_by, status } = req.body;

    // Create a new instance of TaskList model
    const newTask = new TaskListModel({
      task,
      user_story_id: user_story_id,
      created_by: created_by,
      status,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    console.log('Task saved successfully:', savedTask);
    res.status(201).json({ message: 'Task saved successfully', data: savedTask });
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getTasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await TaskListModel.find({ created_by: userId }).lean(); // Ensure to use lean() for plain JavaScript objects
    const populatedTasks = await Promise.all(tasks.map(async (task) => {
      // Fetch user_story details for each task
      const userStoryDetails = await UserStory.findById(task.user_story_id);
      
      // Add user_story details to the task
      return {
        ...task,
        user_story_id: userStoryDetails ? userStoryDetails.user_story : null,
      };
    }));
    console.log(populatedTasks)
    res.json(populatedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update the status of a task
app.post('/updateTaskStatus', async (req, res) => {
  try {
    const { taskId, newStatus } = req.body;
    await TaskListModel.findByIdAndUpdate(taskId, { status: newStatus });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Home Page Route
app.get('/:userId', async (req, res) => {
  const userId = req.params.userId; // Update with your actual user ID retrieval logic

  // Fetch user's teams
  const teamsR = await TeamRoster.find({ member_id: userId }).populate('team_id');
  
  const teams = await TeamName.find({ _id: { $in: teamsR.map(team => team.team_id) } });

  // Fetch projects assigned to user's teams
  const projects = await Project.find({ team_id: { $in: teamsR.map(team => team.team_id) } });

  // Fetch assigned user stories based on the user ID
  const assignedUserStories = await AssignedUserStory.find({ user_id: userId }).populate('user_story_id');
 

  const userStories = await UserStory.find({_id:{$in: assignedUserStories.map(assigned => assigned.user_story_id)}});
  console.log(userStories)
  // Fetch "In Progress" and "Awaiting Confirmation" tasks assigned to the user
  const tasks = await TaskListModel.find({ created_by: userId, status: { $in: ['In Progress', 'Awaiting Confirmation'] } });

  return res.status(200).json({ teams, projects, userStories, tasks });
});


// Team Details Route
app.get('/team/:teamId', async (req, res) => {
  const teamId = req.params.teamId;
  const team = await TeamName.findById(teamId);
  const Members = await TeamRoster.find({ team_id: teamId }).populate('member_id');
  const teamMembers = await User.find({_id:{$in: Members.map(member => member.member_id)}});

  console.log(teamMembers)
  //res.render('teamDetails', { team, teamMembers });
  return res.status(200).json({ team, teamMembers });
});

// Project Details Route
app.get('/project/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId).populate('prod_owner_id mgr_id team_id');
  const prodOwner = await User.findById(project.prod_owner_id);
    const manager = await User.findById(project.mgr_id);
    const team = await TeamName.findById(project.team_id);

    // Include the fetched data in the response
    const responseData = {
      project: {
        ...project.toObject(), // Convert Mongoose document to plain JavaScript object
        prod_owner_name: prodOwner ? prodOwner.firstName +" "+ prodOwner.lastName : 'N/A',
        mgr_name: manager ? manager.firstName +" "+ prodOwner.lastName : 'N/A',
        team_name: team ? team.team_name : 'N/A',
      },
    };

  //res.render('projectDetails', { project });
  return res.status(200).json({responseData});
});

// User Story Details Route
app.get('/userstory/:userStoryId', async (req, res) => {
  const userStoryId = req.params.userStoryId;

  try {
{
    const userStory = await UserStory.findById(userStoryId)
      .populate({
        path: 'proj_id',
        model: 'Project',
      });

    if (!userStory) {
      return res.status(404).json({ error: 'User story not found' });
    }

    const responseData = {
      userStory: {
        ...userStory.toObject(),
        project_name: userStory.proj_id ? userStory.proj_id.proj_name : 'N/A',
      },
    };

    return res.status(200).json(responseData);
  }

  } catch (error) {
    console.error('Error fetching user story data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Task Details Route
app.get('/task/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  console.log(taskId)
  const task = await TaskListModel.findById(taskId).populate('user_story_id');

  
  return res.status(200).json({task});
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
