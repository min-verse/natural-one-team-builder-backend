import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface MemberObj {
  characterName: string;
  playerName: string;
  nameOfClass: string;
  nameOfRace: string;
  level: number;
  alignment: string;
  partyId: number;
}
interface NewMemberProps{
  handleNewMember:(params1:MemberObj)=>void;
}

const NewMemberForm: FC<NewMemberProps> = ({handleNewMember}) => {

  const partyState = useSelector((state: any) => state.party);

  function onMemberSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    console.log(partyState);
    console.log(partyState.stats.id);
    const target = e.target as typeof e.target & {
      characterName: { value: string };
      playerName: { value: string };
      nameOfClass: { value: string };
      nameOfRace: { value: string };
      level: { value: number };
      alignment: { value: string };
      partyId: { value: number };
    };

    const newMember: MemberObj = {
      characterName: target.characterName.value,
      playerName: target.playerName.value,
      nameOfClass: target.nameOfClass.value,
      nameOfRace: target.nameOfRace.value,
      level: target.level.value,
      alignment: target.alignment.value,
      // placeholder partyid value
      partyId: partyState.stats.id
    }

    console.log(newMember);

    fetch(`http://localhost:9292/members`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newMember)
    })
    .then(res=>res.json())
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      alert(`Error: ${error}`);
    })

    handleNewMember(newMember);
    console.log(newMember);

  }

  return (
    <Card className="card-component" border="warning" bg="dark" style={{ width: "100%", height: "100%" }}>
      <Card.Header>Add a New Member</Card.Header>
      <Card.Body>
        <Form style={{backgroundColor:'#212529', color:'white', borderColor:'yellow', padding:20, height:'100%'}} onSubmit={onMemberSubmit}>
          <Form.Group className="mb-3" controlId="characterName">
            <Form.Label>Character Name</Form.Label>
            <Form.Control placeholder="Enter a character name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="playerName">
            <Form.Label>Player Name</Form.Label>
            <Form.Control placeholder="Enter player name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nameOfClass">
            <Form.Label>Class Name</Form.Label>
            <Form.Control placeholder="Enter your member's class" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nameOfRace">
            <Form.Label>Race</Form.Label>
            <Form.Control placeholder="Enter your member character's race" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Control type="number" placeholder="Enter their level" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="alignment">
            <Form.Label>Alignment</Form.Label>
            <Form.Select placeholder="Select their alignment">
              <option> </option>
              <option>Lawful Good</option>
              <option>Neutral Good</option>
              <option>Chaotic Good</option>
              <option>Lawful Neutral</option>
              <option>True Neutral</option>
              <option>Chaotic Neutral</option>
              <option>Lawful Evil</option>
              <option>Neutral Evil</option>
              <option>Chaotic Evil</option>
            </Form.Select>
          </Form.Group>

          <Button style={{ marginTop: 10 }} variant="primary" type="submit">
            Add Member
          </Button>
        </Form>
      </Card.Body>
    </Card>

    // <Form onSubmit={onMemberSubmit}>
    //   <Form.Group className="mb-3" controlId="characterName">
    //     <Form.Label>Character Name</Form.Label>
    //     <Form.Control placeholder="Enter a character name" />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="playerName">
    //     <Form.Label>Player Name</Form.Label>
    //     <Form.Control placeholder="Enter player name" />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="nameOfClass">
    //     <Form.Label>Class Name</Form.Label>
    //     <Form.Control placeholder="Enter your member's class" />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="nameOfRace">
    //     <Form.Label>Race</Form.Label>
    //     <Form.Control placeholder="Enter your member character's race" />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="level">
    //     <Form.Label>Level</Form.Label>
    //     <Form.Control placeholder="Enter your member character's race" />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="alignment">
    //     <Form.Label>Alignment</Form.Label>
    //     <Form.Select placeholder="Select their alignment">
    //     <option> </option>
    //     <option>Lawful Good</option>
    //     <option>Neutral Good</option>
    //     <option>Chaotic Good</option>
    //     <option>Lawful Neutral</option>
    //     <option>True Neutral</option>
    //     <option>Chaotic Neutral</option>
    //     <option>Lawful Evil</option>
    //     <option>Neutral Evil</option>
    //     <option>Chaotic Evil</option>
    //   </Form.Select>
    //   </Form.Group>

    //   <Button style={{marginTop:10}} variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
  );
}

export default NewMemberForm;