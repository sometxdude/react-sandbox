var React = require('react');
Set = React.createClass({
  validate: function(){


  },
  render: function(){

    var deleteButton;
    if(this.props.editMode)
    {
      deleteButton = (<span onClick={this.props.onDeleteSet.bind(null,this.props.id)}>X</span>);
    return (
    <div><input readOnly={!this.props.editMode} type="text" name="weight" ref="weight" value={this.props.weight}/><input readOnly={!this.props.editMode} type="text" name="reps" ref="reps" value={this.props.reps}/>{deleteButton}</div>
    );
    }
    else
    {
      return (<div>{this.props.weight} x {this.props.reps}</div>);
    }
  }

});

Exercise = React.createClass({
  getInitialState: function(){
    return { sets:[],editMode:true};
  },
  uuid: function () {
  var i, random;
  var uuid = '';
  for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
      }

      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
},onEditComplete:function(){

var sets =[];
for(ref in this.refs)
{

  var setComponent = this.refs[ref];
  var weight = setComponent.refs.weight.getDOMNode().value;
  var reps = setComponent.refs.reps.getDOMNode().value;
  var set = {key:this.uuid(),weight:weight,reps:reps};
  sets.push(set);

}
this.setState({editMode:false,sets:sets});
},
  onAddSet:function(e){
    var newSets = this.state.sets.concat([{key:this.uuid(),weight:null,reps:null}])
    this.setState({sets:newSets})
  },
  handleDeleteSet:function(key){
      var filterSets = this.state.sets.filter(function(s){
        return s.key != key;
      });
    this.setState({sets:filterSets})
  },
  render: function(){
    var index = 0;
    var sets = this.state.sets.map(function(set){
      return <Set ref={"set-"+index++} editMode={this.state.editMode} id={set.key} key={set.key} weight={set.weight} reps={set.reps} onDeleteSet={this.handleDeleteSet} />
    }.bind(this));


    var editModeButtons;

    if(this.state.editMode)
    {
        editModeButtons =(
          <span>
      <button onClick={this.onAddSet}> Add Set</button>
      <button className="button button-primary" onClick={this.onEditComplete} > Done</button>
      </span>
       );
    }


    return (
      <div>
      <div>{this.props.name}</div>
      <ol>
      {sets}
      </ol>
      {editModeButtons}
      </div>
    );
  }
});

module.exports  = Exercise;
