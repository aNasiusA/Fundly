const AnalyticsPage = () => {
  type Point = [number, number]; // [x, y] or [lat, lon]

  function isPointInRotatedRect(point: Point, rect: Point[]): boolean {
    // rect should be 4 points in order (clockwise or counterclockwise)
    const [p1, p2, p3, p4] = rect;

    function cross(a: Point, b: Point) {
      return a[0] * b[1] - a[1] * b[0];
    }

    function vector(a: Point, b: Point): Point {
      return [b[0] - a[0], b[1] - a[1]];
    }

    const check = (a: Point, b: Point, c: Point) =>
      cross(vector(a, b), vector(a, c)) >= 0;

    return (
      check(p1, p2, point) &&
      check(p2, p3, point) &&
      check(p3, p4, point) &&
      check(p4, p1, point)
    );
  }

  // Example
  const rotatedRect: Point[] = [
    [5.6037, -0.187],
    [5.6038, -0.1866],
    [5.6033, -0.1865],
    [5.6032, -0.187],
  ];

  const testPoint: Point = [5.6035, -0.1868];
  console.log(isPointInRotatedRect(testPoint, rotatedRect));

  return (
    <div>
      <p>
        {isPointInRotatedRect(testPoint, rotatedRect) ? "Inside" : "Outside"}
      </p>
    </div>
  );
};

export default AnalyticsPage;
