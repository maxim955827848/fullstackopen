import { useState } from 'react'
const VoteOption = ({ onTrigger, caption }) => (
  <button onClick={onTrigger}>
    {caption}
  </button>
)

const DataRow = ({ labelName, numericValue }) => (
  <tr>
    <td>{labelName}</td>
    <td>{numericValue}</td>
  </tr>
)

const ReportBoard = ({ votesGood, votesNeutral, votesBad }) => {
  const totalVotes = votesGood + votesNeutral + votesBad

  if (totalVotes === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  const scoreAverage = (votesGood * 1 + votesBad * -1) / totalVotes
  
  const positivePercentage = (votesGood / totalVotes) * 100

  return (
    <div>
      <h2>statistics</h2>
      {}
      <table>
        <tbody>
          <DataRow labelName="good" numericValue={votesGood} />
          <DataRow labelName="neutral" numericValue={votesNeutral} />
          <DataRow labelName="bad" numericValue={votesBad} />
          <DataRow labelName="all" numericValue={totalVotes} />
          <DataRow labelName="average" numericValue={scoreAverage.toFixed(1)} />
          <DataRow labelName="positive" numericValue={`${positivePercentage.toFixed(1)} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      
      <div>
        <VoteOption onTrigger={() => setGoodCount(goodCount + 1)} caption="good" />
        <VoteOption onTrigger={() => setNeutralCount(neutralCount + 1)} caption="neutral" />
        <VoteOption onTrigger={() => setBadCount(badCount + 1)} caption="bad" />
      </div>

      <ReportBoard 
        votesGood={goodCount} 
        votesNeutral={neutralCount} 
        votesBad={badCount} 
      />
    </div>
  )
}

export default App