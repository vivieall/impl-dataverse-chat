import Error from '../components/error.js';
import { Footer } from '../components/footer.js';

export default function ErrorView() {
  document.getElementById('root').innerHTML = Error();
  Footer();
}
