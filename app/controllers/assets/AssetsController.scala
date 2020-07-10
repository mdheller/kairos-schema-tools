package controllers.assets

import controllers.Assets
import io.github.tetherlessworld.twxplore.lib.base.controllers.assets.BaseAssetsController
import javax.inject.{Inject, Singleton}

@Singleton
class AssetsController @Inject()(assets: Assets) extends BaseAssetsController(assets)
