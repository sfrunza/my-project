import { Button } from '@/components/ui/button';
import { CardWithForm } from './card-with-form';

function App() {
  return (
    <div className="bg-red-500 min-h-screen">
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button>Click me</Button>
      <CardWithForm />
    </div>
  );
}

export default App;
