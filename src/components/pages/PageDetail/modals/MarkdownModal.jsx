import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Image,
  Text,
  Stack,
  Tooltip,
} from '@chakra-ui/react'
import { v4 as uuid_v4 } from 'uuid'
import { AiFillFileMarkdown } from 'react-icons/ai'
import { addComponent, selectPage } from '../../pageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/client'
import axios from '../../../../lib/axios'
function MarkdownModal() {
  const [session] = useSession()
  const dispatch = useDispatch()
  const page = useSelector(selectPage)
  const { isOpen, onOpen, onClose } = useDisclosure()
  // We are getting this position from the carousel.

  const addToColumn = async (label) => {
    const newMarkdown = {
      uuid: uuid_v4(),
      type_of: 'markdown',
      title: markdownTemplates[label].title,
      content: markdownTemplates[label].content,
    }

    dispatch(addComponent(newMarkdown))
    const res = await axios(
      'POST',
      `/pages/${page.uuid}/markdown/`,
      newMarkdown,
      session
    )
    onClose()
  }
  return (
    <>
      <Tooltip
        hasArrow
        label="Markdown"
        bg="white"
        color="black"
        placement="right"
      >
        <Button
          p="0"
          m="0"
          size="sm"
          className="disableFocus"
          opacity=".9"
          _hover={{ opacity: '1' }}
          transition="0.5s all"
          align="center"
          justify="center"
          onClick={onOpen}
        >
          <AiFillFileMarkdown size="24px" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agrega un componente Markdown:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {componentsOptions.map((option) => (
                <Flex
                  key={option.id}
                  p="2"
                  opacity=".7"
                  _hover={{ opacity: '1' }}
                  transition="0.5s all"
                  align="center"
                  border="1px solid"
                  borderRadius="md"
                  cursor="pointer"
                  justify="center"
                  onClick={() => addToColumn(option.label)}
                >
                  <Image src={option.image} w="75px" maxH="75px" />
                  <Flex direction="column" p="1">
                    <Text fontWeight="bold">{option.title}</Text>
                    <Text fontSize="xs">{option.body}</Text>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
const componentsOptions = [
  {
    id: 1,
    title: 'En Blanco',
    label: 'blank',
    body: 'Una hoja de Markdown en blaco? Vaya, un developer de verdad!',
    image:
      'https://user-images.githubusercontent.com/71573508/125737833-df1e780e-23f6-42ed-b833-e4535577c27c.png',
  },
  {
    id: 2,
    title: 'README',
    label: 'readme',
    body: 'No pienses m??s, usa este template para tu pr??ximo README.md en Github.',
    image:
      'https://user-images.githubusercontent.com/71573508/125737754-5f634398-93ea-4ba8-8e06-e6d50e5bfe07.png',
  },
  {
    id: 3,
    title: 'Cheatsheet',
    label: 'cheatsheet',
    body: 'Crea un componente para organizar un tema de estudio. ',
    image:
      'https://user-images.githubusercontent.com/71573508/125879563-0e8c1d5d-1d5f-4cc8-a6a8-0b9071bd20e6.png',
  },
]

const markdownTemplates = {
  blank: {
    title: 'Blank',
    label: 'blank',
    component: 'markdown',
    content: `# Blank
Escribe lo que quieras.`,
  },

  readme: {
    title: 'Readme',
    label: 'readme',
    component: 'markdown',
    content: `# Los Junior - Ejemplo de README para Github.

## Breve descripci??n
Los Junior te ayuda a convertirte en un mejor developer ense????ndote standards de la industria. Ingresa a [Los Junior](http://localhost:3000) y conviertete en desarrollador web junior.
    
## General
    
### El proyecto
    
Describe aqu?? tu proyecto:
    
- El proyecto es un _____________. Fue escrito en ___________ en un transcurso de __ d??as.
- Es mi 1er proyecto usando ___________.
    
### Screenshot
    
![](https://user-images.githubusercontent.com/71573508/124323707-fd5b3380-db3e-11eb-9830-25a26f853838.png)
    
Agrega un screenshot de tu proyecto. La manera m??s f??cil de hacer esto es con la herramienta de recortes (Snipping Tool) que trae Windows 10 por defecto.
    
**Nota: Es MUY recomendable que agregues un screenshot de como luce tu proyecto. Pero si??ntete en la libertad de eliminar este apartado si no gustas agregar una imagen. De nuevo, es MUY recomendable que los README contenga un screenshot del proyecto.**
    
## Proyecto en vivo
    
  - URL del proyecto: [Agrega el url de tu proyecto aqu??](https://your-solution-url.com)
    
## Proceso

### Construido con
    
  - HTML
  - CSS
  - Vanilla Javascript
  - Unit Testing
  - [ReactJS](https://reactjs.org/) - Librer??a de Javascript
  - [Next.js](https://nextjs.org/) - Framework de React
    
**Nota: Estos son ejemplos de algunas tecnolog??as com??nes. Edita esta parte haciendo referencia a las tecnolog??as que usaste en tu proyecto.**
    
### Lo que aprend??
    
Agrega en esta parte algo que aprendiste en el proceso de crear tu proyecto. Tomarte el tiempo de escribir un peque??o fragmento sobre lo que aprendiste y usar bloques de c??digo ayuda a que refuerces lo aprendido. 
    
Agrega un bloque de c??digo para demostrar tus habilidades de junior, como el de abajo:
    
\`\`\`html
<h1>Somos Los Junior</h1>
\`\`\`
\`\`\`css
.mira-este-css {
  color: saprissa-purple;
}
\`\`\`
\`\`\`js
const somos_junior = () => {
  console.log('Y estamos orgullosos de serlo.')
}
\`\`\`
    
    
### Pr??ximos proyectos
    
T??mate un segundo para visualizar c??mo ser??n tus proyectos despu??s de lo aprendido en este. Cu??les son ??reas a mejorar en tu proceso como desarrallodor de software. Escribir esto te ayuda a mantener tu focus y darte cuenta de tus fortalezas y debilidades. 
    
**Not: No es necesario hablar sobre los pr??ximos proyectos en tu README pero pensamos que es bueno para que tengas una idea de hacia d??nde te diriges.**
    
    
## Autor
    
  - Website - [Agrega tu nombre aqu??](https://www.tu-website.com)
  - Github - [@tuNombreDeUsuario](https://www.github.com/tuNombreDeUsuario)
  - Twitter - [@tuNombreDeUsuario](https://www.twitter.com/tuNombreDeUsuario)`,
  },
  cheatsheet: {
    title: 'Cheatsheet',
    label: 'cheatsheet',
    component: 'markdown',
    content: `# Cheatsheet
Users should be able to:
        
- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

### Declare variables in js:

\`\`\`js
var i = 0
\`\`\`
`,
  },
}

export default MarkdownModal
