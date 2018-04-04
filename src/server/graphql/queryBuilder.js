const normalizeQuery = pathOrQuery =>
  typeof pathOrQuery === 'string'
    ? {
        path: pathOrQuery,
        modifiers: {},
      }
    : pathOrQuery

class Eager {
  paths = []
  modifiers = {}

  add(pathOrQuery) {
    const query = normalizeQuery(pathOrQuery)
    this.paths = [...this.paths, query.path]
    this.modifiers = { ...this.modifiers, ...query.modifiers }
  }

  toQuery() {
    if (this.paths.length === 0) return null
    return {
      path: `[${this.paths.join(',')}]`,
      modifiers: this.modifiers,
    }
  }
}

const joinQuery = (source, join) => {
  const sourceQuery = normalizeQuery(source)
  const joinQuery = normalizeQuery(join)

  return {
    path: `${sourceQuery.path}${joinQuery ? `.${joinQuery.path}` : ''}`,
    modifiers: {
      ...sourceQuery.modifiers,
      ...(joinQuery ? joinQuery.modifiers : {}),
    },
  }
}

export const eagerResolvers = {
  paths(fields) {
    const eager = new Eager()
    if (fields.trainings)
      eager.add(
        joinQuery(
          {
            path: 'trainings(orderByRank)',
            modifiers: {
              orderByRank(builder) {
                return builder.orderBy('trainings.rank', 'asc')
              },
            },
          },
          eagerResolvers.trainings(fields.trainings),
        ),
      )

    return eager.toQuery()
  },
  trainings(fields) {
    const eager = new Eager()
    if (fields.trainers) eager.add('trainers')
    if (fields.nextSession || fields.sessions)
      eager.add(
        joinQuery(
          {
            path: 'sessions(liveSessions)',
            modifiers: {
              liveSessions(builder) {
                return builder
                  .whereRaw(
                    "training_sessions.start_date > now() + interval '1 day'",
                  )
                  .orderBy('training_sessions.start_date', 'asc')
                  .limit(3)
              },
            },
          },
          eagerResolvers.sessions({
            ...fields.nextSession,
            ...fields.sessions,
          }),
        ),
      )
    return eager.toQuery()
  },
  sessions(fields) {
    const eager = new Eager()
    eager.add(
      joinQuery('training', eagerResolvers.trainings(fields.training || {})),
    )
    if (fields.location || fields.link) eager.add('location')
    return eager.toQuery()
  },
  trainers(fields) {
    const eager = new Eager()
    if (fields.trainings)
      eager.add(
        joinQuery('trainings', eagerResolvers.trainings(fields.trainings)),
      )
    return eager.toQuery()
  },
  testimonials(fields) {
    const eager = new Eager()
    if (fields.company) eager.add('company')
    return eager.toQuery()
  },
}

export const enhanceQuery = (query, eagerQuery) => {
  if (eagerQuery) return query.eager(eagerQuery.path, eagerQuery.modifiers)
  return query
}
