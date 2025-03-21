import { render, screen } from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
        const limit = 255;
        const longText = 'a'.repeat(limit + 1);
        const truncatedText = longText.substring(0, limit) + "...";

    it('should render the full text if less than 255 characters', () => {
        const text = "Short text";

        render(<ExpandableText text={text}/>)

        expect(screen.getByText(text)).toBeInTheDocument();
        
    })

    it('should truncate text if longer than 255 characters', () => {
        render(<ExpandableText text={longText}/>)

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        const button = screen.getByRole('button');
        //expect(button).toBeInTheDocument(); //Dont really need this as it would fail on the line above if the button was not in the document
        expect(button).toHaveTextContent(/more/i);
        
    })

    it('should expand text when Show MOre button is clicked', async () => {
        render(<ExpandableText text={longText}/>)

        const button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(button);

        expect(screen.getByText(longText)).toBeInTheDocument();
        expect(button).toHaveTextContent(/less/i);
        
    })

    it('should collapse text when Show Less is clicked', async () => {
        //Arrange
        render(<ExpandableText text={longText}/>)
        const showMoreButton = screen.getByRole('button', { name: /more/i});
        const user = userEvent.setup();
        await user.click(showMoreButton);

        //Act
        const showLessButton = screen.getByRole('button', { name: /less/i});
        await user.click(showLessButton);

        //Assert
        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(showMoreButton).toHaveTextContent(/more/i);
        
    })
})