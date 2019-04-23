import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

class HomeGraphql extends Component{
    render() {
        
        const QUERY = gql`
        {
        projects {
            title
            description
            id
            devtype
          }
         }
        `

        return (
            <Query query={QUERY}>
                {({ loading, error, data }) => {
                 if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;

          return (
                <div>
                
                {data.projects.map(project => (
                    <p>{project.title}, {project.description}</p>
                    
                ))}

                </div>
          )
                }
            }
            </Query>
            
        )
    }
}


  
  export default HomeGraphql;