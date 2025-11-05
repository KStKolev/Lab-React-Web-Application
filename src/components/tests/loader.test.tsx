import { render } from "@testing-library/react";
import Loader from "../loader";

describe("Loader Component", () => {
  it("should render loader with correct class", () => {
    const { container } = render(<Loader />);
    const loaderDiv = container.firstChild;
    expect(loaderDiv).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
