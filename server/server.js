const express = require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const app = express();
const VoteModel=require('./models/votedata');
const LoginModel=require('./models/logindata');
const RegisterModel=require('./models/Register');
const TeamModel=require('./models/teams');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sriram:Sri&ram2114@cluster0.oqpjd5r.mongodb.net/')

app.post('/api/reset-votes', async (req, res) => {
  console.log('Received request to reset votes');
  try {
    const result = await VoteModel.deleteMany({});
    console.log('Delete result:', result);
    res.status(200).json({ message: 'Votes have been reset' });
  } catch (error) {
    console.error('Error resetting votes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/getdata', async (req, res) => {
  const { rollNumber, selectedTeam } = req.body;
  
  try {
    const user = await VoteModel.findOne({ rollNumber: rollNumber });

    if (user) {
      res.json("Already Voted");
    } else {
      const result = await VoteModel.create({ rollNumber, selectedTeam });
      res.json("");
    }
  } catch (error) {
    res.json("Error");
  }
});

app.delete("/teams/:name", async (req, res) => {
  const teamName = req.params.name;
  console.log(`Received request to delete team: ${teamName}`);

  try {
    const team = await TeamModel.findOne({ teamname: teamName });

    if (!team) {
      console.log(`Team not found: ${teamName}`);
      return res.status(404).json({ message: "Team not found" });
    }

    await VoteModel.deleteMany({ selectedTeam: team._id });
    await TeamModel.deleteOne({ teamname: teamName });

    res.status(200).json({ message: "Team and corresponding votes deleted successfully" });
  } catch (error) {
    console.error('Error deleting team and votes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/register',(req,res)=>{
  RegisterModel.create(req.body)
  .then(user=>res.json(user))
  .catch(err=>res.json(err))
})
app.post('/teamadd', async (req, res) => {
  const { teamname, teamlead, branch } = req.body;

  try {
    const team = await TeamModel.create({ teamname, teamlead, branch });
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getTeams', async (req, res) => {
  try {
    const teams = await TeamModel.find({}).exec();
    const teamNames = teams.map((team) => team.teamname);
    res.json(teamNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/checkDuplicateRollNumber', async (req, res) => {
  const { rollNumber } = req.body;

  try {
    const existingVote = await VoteModel.findOne({ rollNumber });
    if (existingVote) {
      res.send("Duplicate");
    } else {
      res.send("Not Duplicate");
    }
  } catch (error) {
    console.error('Error checking roll number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getTeams1', async (req, res) => {
  try {
    const teams = await TeamModel.find({}).exec();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/login',(req,res)=>{
  const {username,password}=req.body;
  RegisterModel.findOne({username:username})
  .then(user=>{
    if(user){
      if(user.password===password){
        res.json("success")
      }else{
        res.json("Password is incorrect")
      }
    }else{
      res.json("No User Exists")
    }
  })
})


app.get('/team-vote-counts', async (req, res) => {
  try {
    const teamCounts = await VoteModel.aggregate([
      {
        $lookup: {
          from: 'teams',
          localField: 'selectedTeam',
          foreignField: '_id',
          as: 'team'
        }
      },
      {
        $unwind: '$team'
      },
      {
        $group: {
          _id: '$selectedTeam',
          teamname: { $first: '$team.teamname' },
          teamlead: { $first: '$team.teamlead' },
          branch: { $first: '$team.branch' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Sort teamCounts by count in descending order
    teamCounts.sort((a, b) => b.count - a.count);

    // Extract the winning and runner-up teams
    const winningTeam = teamCounts.length > 0 ? teamCounts[0].teamname : '';
    const runnerUpTeam = teamCounts.length > 1 ? teamCounts[1].teamname : '';

    res.json({ teamCounts, winningTeam, runnerUpTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post("/check", async (req, res) => {
  const { ipAddress } = req.body;
  
  try {
    const user = await VoteModel.findOne({ ipAddress: ipAddress });

    if (user) {
      res.json("Record Exists");
    } else {
      res.json("No such record exists");
    }
  } catch (error) {
    res.json("Error");
  }
});

    
app.listen(10000,()=>{
    console.log("Server is running");
})
