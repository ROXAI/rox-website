export default async function Home() {
  try {
    return (
      <main>
        <h2>Hello World</h2>
      </main>
    );
  } catch (error: any) {
    return <div>error occured {error.message}</div>;
  }
}
