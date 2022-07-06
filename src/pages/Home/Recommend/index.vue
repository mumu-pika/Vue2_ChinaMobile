<template>
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
            <img src="./images/image0.png" />
        </li>
        <li class="banner">
          <img src="./images/image1.png" />
        </li>
        <li class="banner">
          <img src="./images/image2.png" />
        </li>
        <li class="banner">
          <img src="./images/image3.png" />
        </li>
        <li class="banner">
          <img src="./images/image4.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style scoped lang="less">
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .recommend {
      height: 165px;
      background-color: #ffffff;
      margin: 10px 0;
      display: flex;
      .clock {
        width: 20%;
        background-color: #ffffff;
        color: #fff;
        font-size: 18px;
        text-align: center;
        img { 
          width: 100%;
          height: 100%;
        }

      }
      .banner {
        width: 20%;
        margin-left: 1rem;
        img {
          width: 100%;
          height: 100%;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
