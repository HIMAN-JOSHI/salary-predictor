const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');  
const JobDisplay = require('../../features/JobDisplay').default;

describe('JobDisplay Component', () => {
  const mockJobData = {
    title: 'Software Engineer',
    locationName: 'Remote',
    employmentType: 'Full-time',
    descriptionHtml: '<p>This is a job description.</p>'
  };

  it('should display job data correctly', () => {
    render(
      <JobDisplay 
        jobData={mockJobData} 
        salaryPrediction="" 
        onGetSalary={jest.fn()} 
        isLoading={false} 
      />
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('This is a job description.')).toBeInTheDocument();
  });

  it('should display the "Get Salary" button and call onGetSalary when clicked', () => {
    const mockGetSalary = jest.fn();

    render(
      <JobDisplay 
        jobData={mockJobData} 
        salaryPrediction="" 
        onGetSalary={mockGetSalary} 
        isLoading={false} 
      />
    );

    const button = screen.getByText('Get Salary');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockGetSalary).toHaveBeenCalled();
  });

  it('should display salary prediction when available', () => {
    render(
      <JobDisplay 
        jobData={mockJobData} 
        salaryPrediction="$60,000 - $70,000" 
        onGetSalary={jest.fn()} 
        isLoading={false} 
      />
    );

    expect(screen.getByText('$60,000 - $70,000')).toBeInTheDocument();
  });

  it('should display loading state when isLoading is true', () => {
    render(
      <JobDisplay 
        jobData={mockJobData} 
        salaryPrediction="" 
        onGetSalary={jest.fn()} 
        isLoading={true} 
      />
    );

    expect(screen.getByText('Predicting Salary...')).toBeInTheDocument();
  });

  it('should show message when no job data is provided', () => {
    render(
      <JobDisplay 
        jobData={null} 
        salaryPrediction="" 
        onGetSalary={jest.fn()} 
        isLoading={false} 
      />
    );

    expect(screen.getByText('Enter a valid job URL to fetch details.')).toBeInTheDocument();
  });
});
