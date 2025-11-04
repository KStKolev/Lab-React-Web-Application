import { render } from "@testing-library/react";
import Textarea from "../textarea";

describe("Textarea Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render textarea with default props", () => {
    const { container } = render(<Textarea label="Description" name="description" value="" onChange={mockOnChange} />);

    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("should render with error message", () => {
    const { container } = render(
      <Textarea label="Description" name="description" value="" onChange={mockOnChange} error="This field is required" />,
    );

    expect(container.textContent).toContain("This field is required");
  });

  it("should match snapshot without error", () => {
    const { container } = render(<Textarea label="Description" name="description" value="Test content" onChange={mockOnChange} />);

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with error", () => {
    const { container } = render(
      <Textarea label="Description" name="description" value="" onChange={mockOnChange} error="Error message" />,
    );

    expect(container).toMatchSnapshot();
  });
});
