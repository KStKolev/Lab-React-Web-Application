import { render } from "@testing-library/react";
import Input from "../input";

describe("Input Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input with placeholder", () => {
    const { container } = render(<Input name="test" value="" onChange={mockOnChange} placeholder="Enter text" type="text" />);

    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("should render with error state", () => {
    const { container } = render(
      <Input name="test" value="" onChange={mockOnChange} placeholder="Enter text" type="text" error="This field is required" />,
    );

    expect(container.textContent).toContain("This field is required");
  });

  it("should match snapshot", () => {
    const { container } = render(<Input name="test" value="test value" onChange={mockOnChange} placeholder="Enter text" type="text" />);

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with error", () => {
    const { container } = render(
      <Input name="test" value="" onChange={mockOnChange} placeholder="Enter text" type="text" error="Error message" />,
    );

    expect(container).toMatchSnapshot();
  });
});
