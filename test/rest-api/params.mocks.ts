import { setupWorker, rest } from 'msw'

interface ResponseType {
  username: string
  messageId: string
}

const worker = setupWorker(
  rest.get(
    'https://api.github.com/users/:username/messages/:messageId',
    (req, res, ctx) => {
      const { username, messageId } = req.params

      return res(
        ctx.json<ResponseType>({
          username,
          messageId,
        }),
      )
    },
  ),
)

worker.start()
