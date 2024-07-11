import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import WordleSolver from './components/WordleSolver';

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                <WordleSolver/>
            </Container>
        </Layout>
    );
}

export default App;
