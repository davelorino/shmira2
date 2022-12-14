import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import CreateIssueForm from '../../../../features/sprints/form/CreateIssueForm';
import UpdateIssueForm from '../../../../features/sprints/form/UpdateIssueForm';
import NewUpdateIssueForm from '../../../../features/sprints/form/NewUpdateIssueForm';
import { StyledAvatar, AvatarIsActiveLabelBorder } from '../../../../features/sprints/dashboard/Filters/Styles';
import { Label } from 'semantic-ui-react';
import IssuePriorityIcon from '../../../../layout/IssuePriorityIcon';
import Icon from '../../../Icon';

//import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';

import { IssueLink, IssueCard, Title, Bottom /*, Assignees, AssigneeAvatar */ } from './Styles';
import { Issue } from '../../../../models/issue';


interface Props {
  issue: Issue;
  index: number;
}

function renderSelectedIssueType(issue: Issue) {
  if(issue.issue_type == "Story"){
      return(
          <Icon color='#65BA43'type='story' size={14} />
      )
  }
  if(issue.issue_type == "Bug"){
      return(
              <Icon color='#E44D42'  type='bug' size={14} />
      )
  }
  if(issue.issue_type == "Task"){
      return(
              <Icon color='#4FADE6' type='task' size={14} />
      )
  }
}



export default observer(function ProjectBoardListIssue({ issue, index }: Props) {

  const {modalStore, issueStore} = useStore();
  const {selectedIssue, selectedProject} = issueStore;


  // original assignees code: 
  // const assignees = issue.userIds.map(userId => projectUsers.find(user => user.id === userId));

  return (
    <Draggable draggableId={issue.id} index={index} key={issue.id}>
      {( provided,  snapshot) => (
          <div
          style={{display: "flex", overflow: "hidden"}}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => {issueStore.selectIssue(issue.id); modalStore.openModal(<NewUpdateIssueForm />)} }
          >
          <IssueCard isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating} style={{overflow: "hidden"}} >
            <Title>{issue.name}</Title>
            <div style={{display: "inline-block", float: "left", clear: "both"}}></div>
             {
              renderSelectedIssueType(issue)
             }
              
              <IssuePriorityIcon priority={issue.priority}></IssuePriorityIcon>
            <div style={{display: "inline-block", float: "right", clear: "both"}}>
              
                {
                  issue.assignees.map((assignee, index) => (
                <AvatarIsActiveLabelBorder isActive={false} index={index}>
                  <StyledAvatar 
                  value={assignee.id}
                  size='20' 
                  src={assignee.photo ? assignee.photo.url : ''}
                  name={assignee.first_name.concat(' ', assignee.second_name)} 
                  round='20px'
                  />
                </AvatarIsActiveLabelBorder>
                  ))
                  }
            </div>
          </IssueCard>
          </div>
      )}
    </Draggable>
  );
});

