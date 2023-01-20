import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function HomePage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Hello world</h1>
        <p>
          Welcome to our scheduling app.
        </p>
      </div>
    </BasicLayout>
  )
}