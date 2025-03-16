import { render, screen } from '@testing-library/react' //itr
import { User } from '../../src/entities'
import UserAccount from '../../src/components/UserAccount';

describe('UserAccount', () => {
    
    it('should render user name', () => {
        const user: User = { id: 1, name: 'Fred'};



        render(<UserAccount user={user}/>)

        expect(screen.getByText(user.name)).toBeInTheDocument();

    })

    it('should render edit button if user is admin', () => {
        const user: User = { id: 1, name: 'Fred', isAdmin: true};



        render(<UserAccount user={user}/>)

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument(); //Checks that it is in the document
        expect(button).toHaveTextContent(/Edit/i); //Asserts that it has the right label

    })

    it('should not render edit button if user is not admin', () => {
        const user: User = { id: 1, name: 'Fred', isAdmin: false}; //Could also just remove the isAdmin part as it is set to 'false' by default.



        render(<UserAccount user={user}/>)

        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument(); //Checks that button is not in the document

    })

})