import { ReviewService } from "../reviewService";

const mockUserId = "b4f9ab8c-43fa-4bd9-8f82-27a979f7a3a9";
const mockTourId = "81cd8ae4-044e-42bc-ba1f-6108d192edc3";
const getMock = {
  tourId: mockTourId,
  page: 1,
  limit: 10,
};
let mockReviewId = "";

describe("Review MVP Test", () => {
  it("특정 랜드마크의 리뷰를 가지고 온다.", async () => {
    const getReviews = await ReviewService.getReviews({ getReviews: getMock });

    expect(getReviews.total).toEqual(0);
    expect(getReviews.totalPage).toEqual(0);
  });

  it("특정 랜드마크의 리뷰 요약 정보를 가지고 온다.", async () => {
    const getReviewInfo = await ReviewService.getReviewInfo({
      tourId: mockTourId,
    });

    expect(getReviewInfo.totalReview).toEqual(0);
    expect(getReviewInfo.avgRating).toEqual("0.0");
  });

  it("랜드마크의 리뷰를 작성한다. 그 랜드마크의 리뷰 목록을 재호출하고, 리뷰 갯수가 늘어났음을 확인한다.", async () => {
    const addMock = {
      loginUserId: mockUserId,
      tourId: mockTourId,
      content: "isTesting",
      rating: 5,
    };
    const addReview = await ReviewService.addReview(addMock);
    const getReviews = await ReviewService.getReviews({ getReviews: getMock });
    mockReviewId = addReview.id;

    expect(getReviews.total).toEqual(1);
    expect(addReview.content).toEqual("isTesting");
    expect(addReview.rating).toEqual(5);
  });

  it("이미 리뷰를 작성한 랜드마크에 다시 리뷰를 작성하려 할 경우, 에러가 발생한다.", async () => {
    const addMock = {
      loginUserId: mockUserId,
      tourId: mockTourId,
      content: "isTesting",
      rating: 5,
    };
    try {
      await ReviewService.addReview(addMock);
    } catch (err) {
      expect(err.message).toEqual("system.error.alreadyPosting");
    }
  });

  it("랜드마크의 리뷰를 수정한다.", async () => {
    const putMock = {
      loginUserId: mockUserId,
      reviewId: mockReviewId,
      toUpdate: {
        content: "isEditing",
        rating: 4,
      },
    };
    const setReview = await ReviewService.setReview(putMock);

    expect(setReview.content).toEqual("isEditing");
    expect(setReview.rating).toEqual(4);
  });

  it("그 리뷰의 작성자가 아닌 사용자가 수정 요청을 할 때, 에러가 발생한다.", async () => {
    const putMock = {
      loginUserId: "18924713284623964",
      reviewId: mockReviewId,
      toUpdate: {
        content: "isEditing",
        rating: 4,
      },
    };

    try {
      await ReviewService.setReview(putMock);
    } catch (err) {
      expect(err.message).toEqual("system.error.unAuthorized");
    }
  });

  it("존재하지 않는 리뷰에 수정 요청을 할 때, 에러가 발생한다.", async () => {
    const putMock = {
      loginUserId: mockUserId,
      reviewId: "1204124069135809",
      toUpdate: {
        content: "isEditing",
        rating: 4,
      },
    };

    try {
      await ReviewService.setReview(putMock);
    } catch (err) {
      expect(err.message).toEqual("system.error.noReview");
    }
  });

  it("존재하지 않는 리뷰에 삭제 요청을 할 때, 에러가 발생한다.", async () => {
    try {
      await ReviewService.deleteReview({
        loginUserId: mockUserId,
        reviewId: "asdkfjadsnfhglkdghjsfgklh",
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.noReview");
    }
  });

  it("그 리뷰의 작성자가 아닌 사용자가 삭제 요청을 할 때, 에러가 발생한다.", async () => {
    try {
      await ReviewService.deleteReview({
        loginUserId: "1109465812305768234567",
        reviewId: mockReviewId,
      });
    } catch (err) {
      expect(err.message).toEqual("system.error.unAuthorized");
    }
  });

  it("작성한 리뷰를 삭제한다.", async () => {
    const res = await ReviewService.deleteReview({
      loginUserId: mockUserId,
      reviewId: mockReviewId,
    });

    expect(res).toEqual("system.success");
  });
});
