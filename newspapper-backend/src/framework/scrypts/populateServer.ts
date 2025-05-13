import { exec } from 'child_process'
import path from 'path'
import { createMany } from '../function/articleFunction'

export default function populateServer(): void {
  console.log('Executando tarefa agendada:', new Date().toISOString())

  const scriptPath = path.resolve(__dirname, '../../../scrapper.py')

  exec(`python ${scriptPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao executar scrapper.py:', err)
      return
    }

    try {
      console.log('rodando scrypt  por favor aguarde . . .')

      const articles = JSON.parse(stdout)
      console.log('Artigos obtidos do scraper:', articles)

      createMany
        .run(articles)
        .then((result) => {
          console.log(`Resultado da inserção dos artigos: ${result ? 'Sucesso' : 'Nenhum artigo inserido'}`)
        })
        .catch((error) => {
          console.error('Erro ao inserir artigos:', error)
        })
    } catch (parseError) {
      console.error('Erro ao processar saída do scrapper.py:', parseError)
    }
  })
}
