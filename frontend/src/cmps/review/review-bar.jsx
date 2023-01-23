
export function ReviewBar({ userReviews }) {
    const stars = getStarsAvg()

    function getStarsAvg() {
        if (!userReviews) return
        const accInit = { sum: [0, 0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0, 0], avg: [0, 0, 0, 0, 0, 0] }
        const stars = userReviews.reduce((acc, review) => {
            const { rate } = review

            if (rate) {
                const rateFloor = Math.floor(rate)
                acc.sum[rateFloor] += rate
                acc.count[rateFloor]++
                const percentAvgRate = ((acc.sum[rateFloor] / acc.count[rateFloor]) * 100) / 5
                acc.avg[rateFloor] = acc.count[rateFloor] ? percentAvgRate : 0
            }

            return acc
        }, accInit)

        return stars
    }

    return <div className="review-bars">
        {stars.avg.slice(1).map((starAvg, idx) =>
            <div className="review-bars-container" key={idx}>
                <div>{`${idx + 1} Stars`}</div>
                <div className="review-rate-bar">
                    <span className="percent" style={{ width: `${starAvg}%` }}></span>
                </div>
                <span>{`(${stars.count[idx]})`}</span>
            </div>
        )}
    </div>
}