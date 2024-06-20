class Materials::AnisotropicMaterial < Material

  def type_name
    'Anisotropic'
  end

  def stiffness(i,j)

    # special cases
    return stiffness(1,1) if i == 2 && j == 2
    return stiffness(1,2) if i == 2 && j == 1
    return stiffness(1,3) if i == 3 && j == 1
    return stiffness(1,3) if i == 2 && j == 3
    return stiffness(1,3) if i == 3 && j == 2
    return stiffness(4,4) if i == 5 && j == 5
    return (stiffness(1,1) - stiffness(1, 2))/2.0 if i == 6 && j == 6

    if properties
      properties['stiffness']["c#{i}#{j}"] || 0.0
    else
      0.0
    end

  end

  def piezo(i,j)
    if properties
      properties['piezo']["e#{i}#{j}"] || 0.0
    else
      0.0
    end

  end
  def dielectric(i,j)
    return dielectric(1,1) if i == 2 && j == 2
    if properties
      properties['dielectric']["k#{i}#{j}"] || 0.0
    else
      0.0
    end
  end

  def density
    if properties
      properties['density'] || nil
    else
      nil
    end
  end
end